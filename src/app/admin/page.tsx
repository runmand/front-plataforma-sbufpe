'use client';

import Base from '@components/base-layout/index';
import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { localStorageKeyEnum, routerEnum } from 'src/core/enums';
import { ID } from 'src/core/types';
import NewMenu from '@components/newMenu/index';
import FooterMain from '@components/footer/main/index';
import FormService from 'src/modules/form/service';
import { INDEX_RES } from 'src/modules/form/type';
import AdminUserService from 'src/modules/admin/users/service';
import { ADMIN_USER, USER_TYPE } from 'src/modules/admin/users/type';
import FormPermissionService from 'src/modules/admin/formPermissions/service';
import { MATRIX_ROW } from 'src/modules/admin/formPermissions/type';
import TermRequirementService from 'src/modules/admin/termRequirements/service';
import { ADMIN_ROW, TERM_VARIANT } from 'src/modules/admin/termRequirements/type';
import UserTypeService from 'src/modules/userTypes/service';
import { SELECT_FIELD_SX, SELECT_PAPER_SX } from 'src/core/selectSx';

/* ─── Tokens do design do sistema ─────────────────────────────────────────────
 * Mesmos valores usados nas outras telas (/form, /dashboard, alert, question):
 * fundo creme, cartão branco de raio 16px com borda 1.5px, título em serifa,
 * botão primário em gradiente vinho. Mantidos locais aqui pela mesma convenção
 * das páginas irmãs, que declaram `ff`/`C` no próprio arquivo. */
const ff = {
    display: "'Newsreader', Georgia, serif",
    body: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif",
};
const C = {
    primary: '#6D141A',
    secondary: '#921c22',
    bg: '#FAF7F2',
    white: '#fff',
    text: '#1c1917',
    /** Texto secundário legível — mesmo tom do resto do app (alert, question). */
    muted: '#78716c',
    /** Só pra legendas bem discretas (subtítulo do hero, estado vazio). */
    mutedLight: '#a8a29e',
    border: '#e7e5e4',
    borderLight: '#f5f5f4',
    danger: '#b91c1c',
    amber: '#b45309',
};
const CARD_SHADOW = '0 1px 4px rgba(0,0,0,0.04)';

/* Estilos com estados (hover/focus/disabled) ficam em classes `.adm-*` em vez de
 * inline — inline não expressa `:hover`/`:focus`, e sem foco visível os campos do
 * painel ficavam indistinguíveis do resto da página. */
const ADMIN_CSS = `
.adm-input {
    width: 100%;
    /* \`src/css/register.css\` tem uma regra global \`input, select { height: 30px; margin: 5px }\`
     * que vaza pra todo o site (o arquivo é importado no layout raiz). Com \`box-sizing:
     * border-box\`, aquela altura fixa de 30px não caberia o padding daqui e cortava o
     * texto do campo no meio; o \`margin\` também desalinhava os campos da grade. Como
     * classe ganha de seletor de elemento, basta declarar os dois explicitamente.
     * (Os dropdowns não passam por aqui — são MUI, que já zera isso internamente.) */
    height: auto;
    margin: 0;
    padding: 10px 12px;
    line-height: 1.4;
    border-radius: 10px;
    border: 1.5px solid ${C.border};
    background-color: ${C.white};
    color: ${C.text};
    font-size: 13px;
    font-family: ${ff.body};
    outline: none;
    transition: border-color .15s ease, box-shadow .15s ease;
}
.adm-input:hover:not(:disabled) { border-color: #d6d3d1; }
.adm-input:focus {
    border-color: ${C.primary};
    box-shadow: 0 0 0 3px rgba(109,20,26,0.10);
}
.adm-input::placeholder { color: ${C.mutedLight}; }
.adm-input--search { padding-left: 36px; }

/* \`src/css/index.css\` tem uma regra global \`input[type="checkbox"] { display: none; }\`
 * (feita pra um outro componente que usa radio/checkbox escondido + label estilizado)
 * que também apaga QUALQUER checkbox nativo do site, inclusive os daqui — por isso as
 * marcações da matriz não apareciam. O seletor abaixo é mais específico, então religa
 * a exibição só nestes checkboxes, sem tocar no CSS global. */
.adm-check[type="checkbox"] {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin: 0;
    flex-shrink: 0;
    accent-color: ${C.primary};
    cursor: pointer;
}
.adm-check[type="checkbox"]:disabled { cursor: default; }
.adm-check--sm[type="checkbox"] { width: 13px; height: 13px; }

.adm-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    /* Altura fixa (com \`box-sizing: border-box\`, herdado do reset global) em vez de
     * padding vertical: assim as variantes com borda e a primária sem borda ficam do
     * mesmo tamanho, e o botão alinha exatamente com a altura dos campos ao lado. */
    min-height: 40px;
    padding: 0 20px;
    line-height: 1.4;
    border-radius: 10px;
    font-family: ${ff.body};
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.03em;
    white-space: nowrap;
    cursor: pointer;
    transition: all .15s ease;
}
.adm-btn:disabled { cursor: not-allowed; opacity: .55; box-shadow: none; }
.adm-btn--sm { min-height: 32px; padding: 0 14px; font-size: 12px; }
.adm-btn--primary {
    border: none;
    background: linear-gradient(135deg, ${C.primary}, ${C.secondary});
    color: ${C.white};
    box-shadow: 0 4px 12px rgba(109,20,26,0.22);
}
.adm-btn--primary:hover:not(:disabled) { opacity: .88; }
.adm-btn--ghost { border: 1.5px solid ${C.border}; background-color: ${C.white}; color: ${C.text}; }
.adm-btn--ghost:hover:not(:disabled) { border-color: ${C.primary}; color: ${C.primary}; }
.adm-btn--outline { border: 1.5px solid ${C.primary}; background-color: ${C.white}; color: ${C.primary}; }
.adm-btn--outline:hover:not(:disabled) { background-color: rgba(109,20,26,0.06); }
.adm-btn--danger { border: 1.5px solid rgba(185,28,28,0.3); background-color: ${C.white}; color: ${C.danger}; }
.adm-btn--danger:hover:not(:disabled) { background-color: rgba(185,28,28,0.06); border-color: ${C.danger}; }

.adm-tab {
    padding: 7px 18px;
    border: none;
    border-radius: 100px;
    background-color: transparent;
    color: ${C.muted};
    font-size: 0.8rem;
    font-weight: 700;
    font-family: ${ff.body};
    cursor: pointer;
    transition: all .15s ease;
}
.adm-tab:hover { color: ${C.text}; background-color: rgba(28,25,23,0.05); }
.adm-tab--active, .adm-tab--active:hover { background-color: ${C.primary}; color: ${C.white}; }

.adm-row td { transition: background-color .12s ease; }
.adm-row:hover td { background-color: ${C.bg}; }
.adm-chip-doc { transition: border-color .15s ease, background-color .15s ease; }
.adm-chip-doc:hover { border-color: ${C.primary}; }
`;

const TERM_VARIANTS: TERM_VARIANT[] = ['TCLE', 'TCLE2', 'TCLEPROF', 'TCLEUSAB', 'TALE18', 'TALEU13'];

/* ─── Peças reaproveitadas do visual do sistema ──────────────────────────────── */

/** Cartão de seção — mesma silhueta dos cartões de /form e /dashboard
 * (branco, raio 16px, borda 1.5px, sombra rasa), com cabeçalho em serifa. */
function SectionCard({
    title,
    description,
    aside,
    children,
}: {
    title: string;
    description?: React.ReactNode;
    aside?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <section
            style={{
                backgroundColor: C.white,
                border: `1.5px solid ${C.border}`,
                borderRadius: '16px',
                boxShadow: CARD_SHADOW,
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    padding: '22px 28px 18px',
                    borderBottom: `1px solid ${C.border}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                    flexWrap: 'wrap',
                }}
            >
                <div style={{ flex: 1, minWidth: '240px' }}>
                    <h2
                        style={{
                            fontFamily: ff.display,
                            fontSize: '19px',
                            fontWeight: 700,
                            color: C.text,
                            margin: 0,
                            letterSpacing: '-0.01em',
                            lineHeight: 1.3,
                        }}
                    >
                        {title}
                    </h2>
                    {description && (
                        <p
                            style={{
                                fontFamily: ff.body,
                                fontSize: '13px',
                                color: C.muted,
                                margin: '8px 0 0',
                                lineHeight: 1.6,
                                maxWidth: '760px',
                            }}
                        >
                            {description}
                        </p>
                    )}
                </div>
                {aside && <div style={{ flexShrink: 0 }}>{aside}</div>}
            </div>
            <div style={{ padding: '24px 28px 28px' }}>{children}</div>
        </section>
    );
}

type BtnVariant = 'primary' | 'ghost' | 'outline' | 'danger';

function Btn({
    variant = 'primary',
    small = false,
    className,
    children,
    ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; small?: boolean }) {
    return (
        <button
            type="button"
            {...rest}
            className={`adm-btn adm-btn--${variant}${small ? ' adm-btn--sm' : ''}${className ? ` ${className}` : ''}`}
        >
            {children}
        </button>
    );
}

/** Rótulo em caixa alta acima do controle — mesmo padrão dos cabeçalhos de tabela,
 * pra que campo e coluna se leiam como parte do mesmo sistema.
 *
 * `as="div"` é pra quando o filho é um dropdown (MUI): o Autocomplete já tem input
 * próprio e indicador clicável, e envolver isso num `<label>` faria o clique no
 * indicador disputar com o comportamento padrão do rótulo. Nesses casos o nome
 * acessível vai no `ariaLabel` do `AdmSelect`. */
function Field({
    label,
    children,
    style,
    as = 'label',
}: {
    label: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
    as?: 'label' | 'div';
}) {
    const Tag = as === 'div' ? 'div' : 'label';
    return (
        <Tag style={{ display: 'block', ...style }}>
            <span
                style={{
                    display: 'block',
                    fontFamily: ff.body,
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: C.muted,
                    marginBottom: '6px',
                }}
            >
                {label}
            </span>
            {children}
        </Tag>
    );
}

/* ─── Dropdown do painel ──────────────────────────────────────────────────────
 * Mesmo controle que o questionário usa nas perguntas de lista (ver `choiceType:
 * "autoComplete"` em `components/answer/choice/index.tsx`): MUI Autocomplete, então
 * a lista é pesquisável e se comporta igual ao que quem usa a plataforma já conhece.
 *
 * A diferença deliberada é a cor do acento: o tema não define `palette.primary`, então
 * o MUI cru foca em azul (#1976d2). Aqui o foco segue o vinho do sistema, pro dropdown
 * não ser a única peça azul no meio do painel. */

type SelectOption = { id: string; label: string };

function AdmSelect({
    options,
    value,
    onChange,
    ariaLabel,
    placeholder,
    disabled,
}: {
    options: SelectOption[];
    value: string;
    onChange: (id: string) => void;
    ariaLabel: string;
    placeholder?: string;
    disabled?: boolean;
}) {
    return (
        <Autocomplete
            options={options}
            value={options.find((o) => o.id === value) ?? null}
            disabled={disabled}
            size="small"
            openOnFocus
            getOptionLabel={(o) => o.label}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            // Trocar de opção é a única ação útil aqui — não existe "nenhum
            // formulário"/"nenhum tipo" pra selecionar, então ignora o limpar.
            onChange={(_, opt) => opt && onChange(opt.id)}
            noOptionsText="Nada encontrado"
            sx={{ width: '100%', '& .MuiAutocomplete-clearIndicator': { display: 'none' } }}
            slotProps={{ paper: { sx: SELECT_PAPER_SX } }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={placeholder}
                    inputProps={{ ...params.inputProps, 'aria-label': ariaLabel }}
                    sx={SELECT_FIELD_SX}
                />
            )}
        />
    );
}

type Tone = 'neutral' | 'primary' | 'amber';

const TONE: Record<Tone, { bg: string; border: string; color: string }> = {
    neutral: { bg: 'rgba(107,114,128,0.06)', border: C.border, color: C.muted },
    primary: { bg: 'rgba(109,20,26,0.07)', border: 'rgba(109,20,26,0.22)', color: C.primary },
    amber: { bg: 'rgba(217,119,6,0.08)', border: 'rgba(217,119,6,0.25)', color: '#92400e' },
};

/** Selo arredondado — mesmo formato dos badges dos cartões de /dashboard. */
function Chip({ tone = 'neutral', children }: { tone?: Tone; children: React.ReactNode }) {
    const t = TONE[tone];
    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 11px',
                borderRadius: '100px',
                backgroundColor: t.bg,
                border: `1px solid ${t.border}`,
                color: t.color,
                fontFamily: ff.body,
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
            }}
        >
            {children}
        </span>
    );
}

function Callout({ tone = 'neutral', children }: { tone?: Tone; children: React.ReactNode }) {
    const t = TONE[tone];
    return (
        <div
            style={{
                padding: '13px 16px',
                borderRadius: '12px',
                backgroundColor: t.bg,
                border: `1px solid ${t.border}`,
                color: t.color,
                fontFamily: ff.body,
                fontSize: '13px',
                lineHeight: 1.6,
                maxWidth: '760px',
            }}
        >
            {children}
        </div>
    );
}

/** Moldura da tabela: cantos arredondados e cabeçalho no creme do sistema, pra a
 * tabela não ficar "solta" dentro do cartão branco. */
function TableShell({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ border: `1px solid ${C.border}`, borderRadius: '12px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: ff.body, fontSize: '13px' }}>
                {children}
            </table>
        </div>
    );
}

const thStyle: React.CSSProperties = {
    padding: '11px 16px',
    backgroundColor: C.bg,
    borderBottom: `1px solid ${C.border}`,
    color: C.muted,
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    textAlign: 'left',
    whiteSpace: 'nowrap',
};
/** `<th>`/`<td>` não herdam uma cor legível do global CSS neste app (que ainda tem
 * uma regra de `prefers-color-scheme: dark` no body) — sem cor explícita o texto
 * das tabelas fica quase invisível. */
const tdStyle: React.CSSProperties = {
    padding: '12px 16px',
    color: C.text,
    backgroundColor: C.white,
};

function EmptyState({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                padding: '38px 20px',
                textAlign: 'center',
                fontFamily: ff.body,
                fontSize: '13px',
                color: C.mutedLight,
                backgroundColor: C.white,
            }}
        >
            {children}
        </div>
    );
}

function OrDivider() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: C.border }} />
            <span
                style={{
                    fontFamily: ff.body,
                    fontSize: '11px',
                    fontWeight: 700,
                    color: C.mutedLight,
                    letterSpacing: '0.14em',
                }}
            >
                OU
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: C.border }} />
        </div>
    );
}

const SearchIcon = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={C.mutedLight}
        strokeWidth={2.2}
        strokeLinecap="round"
        style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
    >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
    </svg>
);

const typeLabel = (t: { id: ID; description: string } | ID | null | undefined) =>
    t && typeof t === 'object' ? t.description : String(t ?? '');
const typeIdOf = (t: { id: ID; description: string } | ID | null | undefined) =>
    t && typeof t === 'object' ? t.id : t;

/** CPF é dado sensível — o backend já manda mascarado, mas mascaramos de novo aqui
 * (defesa em profundidade: nunca renderiza um CPF completo, mesmo se algo mudar
 * do lado do backend). */
const maskCpfDisplay = (cpf: string) => {
    const digits = cpf.replace(/\D/g, '');
    if (digits.length !== 11) return cpf; // já veio mascarado (ex.: "***.***.***-45")
    return `***.***.***-${digits.slice(9)}`;
};

/* ─── Aba: Usuários (objetivos 1, 2 e 3) ─────────────────────────────────── */
function UsersTab() {
    const service = new AdminUserService();
    const { enqueueSnackbar } = useSnackbar();
    const [users, setUsers] = useState<ADMIN_USER[]>([]);
    const [types, setTypes] = useState<USER_TYPE[]>([]);
    const [search, setSearch] = useState('');
    const [showCreate, setShowCreate] = useState(false);
    const [creating, setCreating] = useState(false);
    const [form, setForm] = useState({ login: '', email: '', pwd: '', typeId: '', isTest: false });

    const load = () => {
        service.index({ search: search || undefined }).then((res) => {
            if (!res.errors) setUsers(res.data ?? []);
        });
    };

    useEffect(() => {
        service.getUserTypes().then((res) => {
            if (!res.errors) setTypes(res.data ?? []);
        });
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUpdateType = (id: ID, typeId: string) => {
        if (!typeId) return;
        service.updateType(id, Number(typeId)).then((res) => {
            if (res.errors) {
                res.errors.forEach((e) => enqueueSnackbar(e, { variant: 'error' }));
            } else {
                enqueueSnackbar('Tipo atualizado.', { variant: 'success' });
                load();
            }
        });
    };

    const handleCreate = () => {
        if (!form.login || !form.email || !form.pwd || !form.typeId) {
            enqueueSnackbar('Preencha login, e-mail, senha e tipo.', { variant: 'warning' });
            return;
        }
        setCreating(true);
        service
            .create({ login: form.login, email: form.email, pwd: form.pwd, typeId: Number(form.typeId), isTest: form.isTest })
            .then((res) => {
                if (res.errors) {
                    res.errors.forEach((e) => enqueueSnackbar(e, { variant: 'error' }));
                } else {
                    enqueueSnackbar('Usuário cadastrado.', { variant: 'success' });
                    setShowCreate(false);
                    setForm({ login: '', email: '', pwd: '', typeId: '', isTest: false });
                    load();
                }
            })
            .finally(() => setCreating(false));
    };

    const typeOptions: SelectOption[] = types.map((t) => ({ id: String(t.id), label: t.description }));

    return (
        <SectionCard
            title="Usuários"
            description="Busque uma conta pelo login, e-mail, CPF ou celular, troque o tipo de usuário e cadastre novas contas."
            aside={
                <Chip tone="primary">
                    {users.length} {users.length === 1 ? 'conta' : 'contas'}
                </Chip>
            }
        >
            <div style={{ display: 'flex', gap: '10px', marginBottom: '18px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                    <SearchIcon />
                    <input
                        className="adm-input adm-input--search"
                        placeholder="Buscar por login, e-mail, CPF ou celular..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && load()}
                    />
                </div>
                <Btn onClick={load}>Buscar</Btn>
                <Btn variant="outline" onClick={() => setShowCreate((v) => !v)}>
                    {showCreate ? 'Cancelar' : '+ Novo usuário'}
                </Btn>
            </div>

            {showCreate && (
                <div
                    style={{
                        marginBottom: '20px',
                        padding: '20px',
                        border: `1.5px solid ${C.border}`,
                        borderRadius: '14px',
                        backgroundColor: C.bg,
                    }}
                >
                    <p
                        style={{
                            fontFamily: ff.display,
                            fontSize: '15px',
                            fontWeight: 700,
                            color: C.text,
                            margin: '0 0 16px',
                        }}
                    >
                        Novo usuário
                    </p>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '14px',
                            marginBottom: '16px',
                        }}
                    >
                        <Field label="Login">
                            <input
                                className="adm-input"
                                placeholder="CPF, celular, e-mail ou username"
                                value={form.login}
                                onChange={(e) => setForm({ ...form, login: e.target.value })}
                            />
                        </Field>
                        <Field label="E-mail">
                            <input
                                className="adm-input"
                                placeholder="nome@exemplo.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </Field>
                        <Field label="Senha">
                            <input
                                className="adm-input"
                                placeholder="••••••••"
                                type="password"
                                value={form.pwd}
                                onChange={(e) => setForm({ ...form, pwd: e.target.value })}
                            />
                        </Field>
                        <Field label="Tipo de usuário" as="div">
                            <AdmSelect
                                ariaLabel="Tipo de usuário"
                                placeholder="Selecione..."
                                options={typeOptions}
                                value={form.typeId}
                                onChange={(id) => setForm({ ...form, typeId: id })}
                            />
                        </Field>
                    </div>
                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <label
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '13px',
                                fontFamily: ff.body,
                                color: C.text,
                                cursor: 'pointer',
                            }}
                        >
                            <input
                                className="adm-check"
                                type="checkbox"
                                checked={form.isTest}
                                onChange={(e) => setForm({ ...form, isTest: e.target.checked })}
                            />
                            Conta de teste
                        </label>
                        <div style={{ flex: 1 }} />
                        <Btn variant="ghost" disabled={creating} onClick={() => setShowCreate(false)}>
                            Cancelar
                        </Btn>
                        <Btn disabled={creating} onClick={handleCreate}>
                            {creating ? 'Salvando...' : 'Cadastrar'}
                        </Btn>
                    </div>
                </div>
            )}

            <TableShell>
                <thead>
                    <tr>
                        <th style={thStyle}>Login</th>
                        <th style={thStyle}>E-mail</th>
                        <th style={thStyle}>Tipo</th>
                        <th style={thStyle}>Teste</th>
                        <th style={thStyle}>Trocar tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, i) => (
                        <tr
                            key={String(u.id)}
                            className="adm-row"
                            style={{ borderTop: i === 0 ? 'none' : `1px solid ${C.borderLight}` }}
                        >
                            <td style={{ ...tdStyle, fontWeight: 600 }}>
                                {u.cpf ? maskCpfDisplay(u.cpf) : u.cellphone || u.username || '—'}
                            </td>
                            <td style={{ ...tdStyle, color: C.muted }}>{u.email || '—'}</td>
                            <td style={tdStyle}>
                                <Chip>{typeLabel(u.typeId) || '—'}</Chip>
                            </td>
                            <td style={tdStyle}>
                                {u.isTest ? <Chip tone="amber">Teste</Chip> : <span style={{ color: C.mutedLight }}>—</span>}
                            </td>
                            <td style={{ ...tdStyle, minWidth: '210px' }}>
                                <AdmSelect
                                    ariaLabel={`Trocar tipo de ${u.email || u.username || 'usuário'}`}
                                    options={typeOptions}
                                    value={String(typeIdOf(u.typeId) ?? '')}
                                    onChange={(id) => handleUpdateType(u.id, id)}
                                />
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan={5} style={{ padding: 0 }}>
                                <EmptyState>Nenhum usuário encontrado.</EmptyState>
                            </td>
                        </tr>
                    )}
                </tbody>
            </TableShell>
        </SectionCard>
    );
}

/* ─── Aba: Permissões de Formulários (objetivo 5) ────────────────────────── */
function FormPermissionsTab({ forms }: { forms: INDEX_RES[] }) {
    const service = new FormPermissionService();
    const { enqueueSnackbar } = useSnackbar();
    const [formId, setFormId] = useState<ID>(forms[0]?.id ?? '');
    const [rows, setRows] = useState<MATRIX_ROW[]>([]);

    const load = (id: ID) => {
        if (!id) return;
        service.matrixForForm(id).then((res) => {
            if (!res.errors) setRows(res.data ?? []);
        });
    };

    useEffect(() => {
        load(formId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formId]);

    const toggle = (row: MATRIX_ROW, field: 'canView' | 'canAnswer') => {
        const next = { ...row, [field]: !row[field] };
        service.upsert({ formId, typeId: row.typeId, canView: next.canView, canAnswer: next.canAnswer }).then((res) => {
            if (res.errors) {
                res.errors.forEach((e) => enqueueSnackbar(e, { variant: 'error' }));
            } else {
                setRows((prev) => prev.map((r) => (r.typeId === row.typeId ? next : r)));
            }
        });
    };

    const checkCell: React.CSSProperties = { ...tdStyle, textAlign: 'center' };

    return (
        <SectionCard
            title="Permissões de Formulários"
            description="Escolha um formulário e marque quais tipos de usuário podem vê-lo e respondê-lo."
        >
            <div style={{ marginBottom: '18px' }}>
                <Callout>
                    <strong>Admin</strong> e <strong>Desenvolvedor</strong> sempre têm acesso total, independente desta matriz —
                    ela só vale pros demais tipos. A ausência de marcação significa acesso negado.
                </Callout>
            </div>

            <Field label="Formulário" as="div" style={{ maxWidth: '420px', marginBottom: '20px' }}>
                <AdmSelect
                    ariaLabel="Formulário"
                    options={forms.map((f) => ({ id: String(f.id), label: f.title }))}
                    value={String(formId)}
                    onChange={(id) => setFormId(id)}
                />
            </Field>

            <TableShell>
                <thead>
                    <tr>
                        <th style={thStyle}>Tipo de usuário</th>
                        <th style={{ ...thStyle, textAlign: 'center', width: '140px' }}>Pode ver</th>
                        <th style={{ ...thStyle, textAlign: 'center', width: '160px' }}>Pode responder</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr
                            key={String(r.typeId)}
                            className="adm-row"
                            style={{ borderTop: i === 0 ? 'none' : `1px solid ${C.borderLight}` }}
                        >
                            <td style={{ ...tdStyle, fontWeight: 600 }}>{r.typeDescription}</td>
                            <td style={checkCell}>
                                <input
                                    className="adm-check"
                                    type="checkbox"
                                    checked={r.canView}
                                    onChange={() => toggle(r, 'canView')}
                                />
                            </td>
                            <td style={checkCell}>
                                <input
                                    className="adm-check"
                                    type="checkbox"
                                    checked={r.canAnswer}
                                    onChange={() => toggle(r, 'canAnswer')}
                                />
                            </td>
                        </tr>
                    ))}
                    {rows.length === 0 && (
                        <tr>
                            <td colSpan={3} style={{ padding: 0 }}>
                                <EmptyState>Nenhum tipo de usuário para configurar.</EmptyState>
                            </td>
                        </tr>
                    )}
                </tbody>
            </TableShell>
        </SectionCard>
    );
}

/* ─── Aba: Termos / TCLE (objetivo 4) ────────────────────────────────────── */

/** Mesmo valor reservado que o backend usa (`FormTermRequirement.EXEMPT_PATH_KEY`)
 * pra marcar um tipo como isento de termos num formulário. */
const EXEMPT_PATH_KEY = '__exempt__';

/** Rótulos amigáveis dos 6 documentos — mesmo texto que a pessoa vê de verdade na
 * hora de assinar (ver `VARIANT_META` em `components/tcle/index.tsx`), pra quem
 * mexe no painel não precisar decorar os códigos técnicos (TCLE2, TALEU13...). */
const TERM_VARIANT_LABEL: Record<TERM_VARIANT, { title: string; subtitle: string }> = {
    TCLE: { title: 'TCLE', subtitle: 'Responsável legal · menor de 18 anos' },
    TCLE2: { title: 'TCLE', subtitle: 'Maior de 18 anos' },
    TCLEPROF: { title: 'TCLE', subtitle: 'Profissionais' },
    TCLEUSAB: { title: 'TCLE', subtitle: 'Teste de usabilidade' },
    TALE18: { title: 'TALE', subtitle: '13 a 18 anos' },
    TALEU13: { title: 'TALE Lúdico', subtitle: '5 a 12 anos' },
};

type PathGroup = { pathKey: string; rows: ADMIN_ROW[] };

function TermRequirementsTab({ forms }: { forms: INDEX_RES[] }) {
    const service = new TermRequirementService();
    const userService = new AdminUserService();
    const { enqueueSnackbar } = useSnackbar();
    const [formId, setFormId] = useState<ID>(forms[0]?.id ?? '');
    const [rows, setRows] = useState<ADMIN_ROW[]>([]);
    const [types, setTypes] = useState<USER_TYPE[]>([]);
    const [viewTypeId, setViewTypeId] = useState<string>('default');
    const [creatorOpen, setCreatorOpen] = useState(false);
    const [creatorName, setCreatorName] = useState('');
    const [creatorVariants, setCreatorVariants] = useState<TERM_VARIANT[]>([]);
    const [busy, setBusy] = useState(false);

    const load = (id: ID) => {
        if (!id) return;
        service.adminListForForm(id).then((res) => {
            if (!res.errors) setRows(res.data ?? []);
        });
    };

    useEffect(() => {
        userService.getUserTypes().then((res) => {
            if (!res.errors) setTypes(res.data ?? []);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setViewTypeId('default');
        load(formId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formId]);

    const showErrors = (errors?: string[]) => errors?.forEach((e) => enqueueSnackbar(e, { variant: 'error' }));

    // Linhas que valem pro tipo selecionado agora ("Padrão" = typeId nulo).
    const rowsForView = rows.filter((r) => (viewTypeId === 'default' ? !r.typeId : String(typeIdOf(r.typeId)) === viewTypeId));
    const isExempt = rowsForView.some((r) => r.pathKey === EXEMPT_PATH_KEY);

    const pathGroups: PathGroup[] = [];
    rowsForView
        .filter((r) => r.pathKey !== EXEMPT_PATH_KEY)
        .forEach((r) => {
            let group = pathGroups.find((g) => g.pathKey === r.pathKey);
            if (!group) {
                group = { pathKey: r.pathKey, rows: [] };
                pathGroups.push(group);
            }
            group.rows.push(r);
        });

    const currentTypeId = () => (viewTypeId === 'default' ? null : Number(viewTypeId));
    const refresh = () => load(formId);

    const handleToggleExempt = async () => {
        setBusy(true);
        try {
            if (isExempt) {
                const exemptRows = rowsForView.filter((r) => r.pathKey === EXEMPT_PATH_KEY);
                await Promise.all(exemptRows.map((r) => service.remove(r.id)));
            } else {
                const res = await service.create({ formId, typeId: currentTypeId(), pathKey: EXEMPT_PATH_KEY, variant: null });
                showErrors(res.errors);
            }
            refresh();
        } finally {
            setBusy(false);
        }
    };

    const handleRemovePath = async (pathKey: string) => {
        const group = pathGroups.find((g) => g.pathKey === pathKey);
        if (!group) return;
        setBusy(true);
        try {
            await Promise.all(group.rows.map((r) => service.remove(r.id)));
            refresh();
        } finally {
            setBusy(false);
        }
    };

    const handleToggleDocInGroup = async (pathKey: string, variant: TERM_VARIANT) => {
        const group = pathGroups.find((g) => g.pathKey === pathKey);
        const existing = group?.rows.find((r) => r.variant === variant);
        setBusy(true);
        try {
            const res = existing
                ? await service.remove(existing.id)
                : await service.create({ formId, typeId: currentTypeId(), pathKey, variant });
            showErrors(res.errors);
            refresh();
        } finally {
            setBusy(false);
        }
    };

    const openCreator = () => {
        setCreatorName(`Forma ${pathGroups.length + 1}`);
        setCreatorVariants([]);
        setCreatorOpen(true);
    };

    const handleCreatePath = async () => {
        const name = creatorName.trim();
        if (!name || creatorVariants.length === 0) {
            enqueueSnackbar('Dê um nome e marque pelo menos um documento.', { variant: 'error' });
            return;
        }
        if (name === EXEMPT_PATH_KEY || pathGroups.some((g) => g.pathKey === name)) {
            enqueueSnackbar('Já existe uma forma com esse nome — escolha outro.', { variant: 'error' });
            return;
        }
        setBusy(true);
        try {
            const results = await Promise.all(
                creatorVariants.map((v) => service.create({ formId, typeId: currentTypeId(), pathKey: name, variant: v }))
            );
            const errors = results.flatMap((r) => r.errors ?? []);
            if (errors.length) {
                showErrors(errors);
            } else {
                setCreatorOpen(false);
                enqueueSnackbar('Forma de consentimento adicionada.', { variant: 'success' });
            }
            refresh();
        } finally {
            setBusy(false);
        }
    };

    const selectedType = types.find((t) => String(t.id) === viewTypeId);
    const docChipStyle = (checked: boolean): React.CSSProperties => ({
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        padding: '8px 13px',
        borderRadius: '100px',
        border: `1.5px solid ${checked ? C.primary : C.border}`,
        backgroundColor: checked ? 'rgba(109,20,26,0.06)' : C.white,
        color: checked ? C.primary : C.text,
        fontFamily: ff.body,
        fontSize: '12px',
        cursor: busy ? 'default' : 'pointer',
    });

    const docChips = (isChecked: (v: TERM_VARIANT) => boolean, onToggle: (v: TERM_VARIANT) => void) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {TERM_VARIANTS.map((v) => {
                const checked = isChecked(v);
                return (
                    <label key={v} className="adm-chip-doc" style={docChipStyle(checked)}>
                        <input
                            className="adm-check adm-check--sm"
                            type="checkbox"
                            checked={checked}
                            disabled={busy}
                            onChange={() => onToggle(v)}
                        />
                        <span>
                            <strong>{TERM_VARIANT_LABEL[v].title}</strong> — {TERM_VARIANT_LABEL[v].subtitle}
                        </span>
                    </label>
                );
            })}
        </div>
    );

    return (
        <SectionCard
            title="Termos (TCLE)"
            description={
                <>
                    Aqui você decide quais termos de consentimento a pessoa precisa assinar antes de responder este formulário, e
                    pode variar por tipo de usuário. Pra cada tipo pode existir mais de uma <strong>forma de consentimento</strong>{' '}
                    — a pessoa só precisa completar UMA delas, não todas. Serve, por exemplo, pra separar o caso de um adulto
                    (assina só um termo) do caso de um menor de idade (assina dois termos diferentes) no mesmo formulário.
                </>
            }
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '14px',
                    maxWidth: '760px',
                    marginBottom: '20px',
                }}
            >
                <Field label="Formulário" as="div">
                    <AdmSelect
                        ariaLabel="Formulário"
                        options={forms.map((f) => ({ id: String(f.id), label: f.title }))}
                        value={String(formId)}
                        onChange={(id) => setFormId(id)}
                    />
                </Field>
                <Field label="Pra qual tipo de usuário?" as="div">
                    <AdmSelect
                        ariaLabel="Pra qual tipo de usuário?"
                        options={[
                            { id: 'default', label: 'Padrão (qualquer tipo sem regra própria)' },
                            ...types.map((t) => ({ id: String(t.id), label: t.description })),
                        ]}
                        value={viewTypeId}
                        onChange={(id) => setViewTypeId(id)}
                    />
                </Field>
            </div>

            {viewTypeId !== 'default' && (
                <div style={{ marginBottom: '20px' }}>
                    <Callout tone={rowsForView.length > 0 ? 'amber' : 'neutral'}>
                        {rowsForView.length > 0 ? (
                            <>
                                ⚠ <strong>{selectedType?.description}</strong> tem regra própria aqui — ela substitui completamente
                                a regra &quot;Padrão&quot; do formulário, só pra esse tipo.
                            </>
                        ) : (
                            <>
                                <strong>{selectedType?.description}</strong> ainda não tem regra própria — está seguindo a regra
                                &quot;Padrão&quot; deste formulário. Só configure algo aqui se esse tipo precisar de algo DIFERENTE
                                do padrão.
                            </>
                        )}
                    </Callout>
                </div>
            )}

            <label
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '15px 18px',
                    borderRadius: '12px',
                    border: `1.5px solid ${isExempt ? C.primary : C.border}`,
                    backgroundColor: isExempt ? 'rgba(109,20,26,0.05)' : C.bg,
                    marginBottom: '20px',
                    cursor: busy ? 'default' : 'pointer',
                    fontFamily: ff.body,
                    maxWidth: '760px',
                }}
            >
                <input className="adm-check" type="checkbox" checked={isExempt} disabled={busy} onChange={handleToggleExempt} />
                <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: C.text }}>Isento — não precisa assinar nada</div>
                    <div style={{ fontSize: '12px', color: C.muted, marginTop: '2px', lineHeight: 1.5 }}>
                        Marque se esse tipo de usuário pode responder este formulário sem assinar termo nenhum.
                    </div>
                </div>
            </label>

            {!isExempt && (
                <div style={{ opacity: busy ? 0.6 : 1, maxWidth: '760px', transition: 'opacity 0.15s ease' }}>
                    {pathGroups.length === 0 && !creatorOpen && (
                        <div style={{ marginBottom: '16px' }}>
                            <Callout>
                                Nenhuma forma de consentimento configurada — do jeito que está hoje, ninguém desse tipo precisa
                                assinar nada pra responder este formulário.
                            </Callout>
                        </div>
                    )}

                    {pathGroups.map((group, i) => (
                        <React.Fragment key={group.pathKey}>
                            {i > 0 && <OrDivider />}
                            <div
                                style={{
                                    border: `1.5px solid ${C.border}`,
                                    borderRadius: '14px',
                                    backgroundColor: C.bg,
                                    marginBottom: '8px',
                                    overflow: 'hidden',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        gap: '12px',
                                        padding: '16px 20px 14px',
                                        borderBottom: `1px solid ${C.border}`,
                                    }}
                                >
                                    <div>
                                        <div style={{ fontFamily: ff.display, fontSize: '15px', fontWeight: 700, color: C.text }}>
                                            {group.pathKey}
                                        </div>
                                        <div
                                            style={{
                                                fontFamily: ff.body,
                                                fontSize: '12px',
                                                color: C.muted,
                                                marginTop: '3px',
                                            }}
                                        >
                                            Precisa assinar TODOS os documentos marcados abaixo
                                        </div>
                                    </div>
                                    <Btn
                                        variant="danger"
                                        small
                                        style={{ flexShrink: 0 }}
                                        onClick={() => handleRemovePath(group.pathKey)}
                                        disabled={busy}
                                    >
                                        Remover esta forma
                                    </Btn>
                                </div>
                                <div style={{ padding: '16px 20px 18px' }}>
                                    {docChips(
                                        (v) => group.rows.some((r) => r.variant === v),
                                        (v) => handleToggleDocInGroup(group.pathKey, v)
                                    )}
                                </div>
                            </div>
                        </React.Fragment>
                    ))}

                    {creatorOpen ? (
                        <div
                            style={{
                                border: `1.5px dashed ${C.primary}`,
                                borderRadius: '14px',
                                padding: '20px',
                                backgroundColor: 'rgba(109,20,26,0.03)',
                            }}
                        >
                            <Field
                                label="Nome desta forma de consentimento"
                                style={{ maxWidth: '340px', marginBottom: '6px' }}
                            >
                                <input
                                    className="adm-input"
                                    placeholder='Ex.: "Adulto", "Menor de 13 a 18 anos"'
                                    value={creatorName}
                                    onChange={(e) => setCreatorName(e.target.value)}
                                />
                            </Field>
                            <p
                                style={{
                                    fontFamily: ff.body,
                                    fontSize: '12px',
                                    color: C.muted,
                                    margin: '0 0 16px',
                                    lineHeight: 1.5,
                                }}
                            >
                                Marque os documentos que essa forma exige — a pessoa precisará assinar todos eles.
                            </p>
                            <div style={{ marginBottom: '18px' }}>
                                {docChips(
                                    (v) => creatorVariants.includes(v),
                                    (v) => setCreatorVariants((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Btn onClick={handleCreatePath} disabled={busy}>
                                    Salvar forma
                                </Btn>
                                <Btn variant="ghost" onClick={() => setCreatorOpen(false)} disabled={busy}>
                                    Cancelar
                                </Btn>
                            </div>
                        </div>
                    ) : (
                        <Btn variant="outline" onClick={openCreator} disabled={busy}>
                            + Adicionar forma de consentimento
                        </Btn>
                    )}
                </div>
            )}
        </SectionCard>
    );
}

export default function AdminPage() {
    const router = useRouter();
    const [tab, setTab] = useState<'users' | 'formPermissions' | 'termRequirements'>('users');
    const [forms, setForms] = useState<INDEX_RES[]>([]);
    const [allowed, setAllowed] = useState<boolean | null>(null);

    useEffect(() => {
        document.title = 'Painel Admin | GestBucal';

        // Guarda de UX (não é a segurança real — isso é feito pelo backend em toda
        // rota /admin/*, restrito a Admin ou Desenvolvedor). Resolvido por DESCRIÇÃO
        // via `/user-types`, não por id numérico fixo — o id de "Desenvolvedor" não é
        // garantido ser o mesmo em todo ambiente/banco.
        const typeId = Number(localStorage.getItem(localStorageKeyEnum.TYPE_ID));
        new UserTypeService().index().then((res) => {
            const myType = res.data?.find((t) => String(t.id) === String(typeId));
            const description = myType?.description?.toLowerCase();
            const ok = description === 'admin' || description === 'desenvolvedor';
            setAllowed(ok);
            if (!ok) {
                router.push(routerEnum.INITIAL);
                return;
            }

            new FormService().index().then((formsRes) => {
                if (!formsRes.errors) setForms(formsRes.data ?? []);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tabs: { key: typeof tab; label: string }[] = [
        { key: 'users', label: 'Usuários' },
        { key: 'formPermissions', label: 'Permissões de Formulários' },
        { key: 'termRequirements', label: 'Termos (TCLE)' },
    ];

    if (allowed === null) return <div style={{ minHeight: '70vh' }} />;

    return (
        <Base
            appBarChild={<NewMenu />}
            mainContainerChild={
                <div style={{ backgroundColor: C.bg, minHeight: '88vh', padding: '0 0 80px' }}>
                    <style>{ADMIN_CSS}</style>

                    {/* Hero header — mesma composição de /form e /dashboard:
                        barra de destaque em gradiente, título em serifa, subtítulo
                        discreto e o grupo de abas em pílula. */}
                    <div
                        style={{
                            backgroundColor: C.white,
                            borderBottom: `1px solid ${C.border}`,
                            padding: '72px 24px 48px',
                            marginBottom: '44px',
                            textAlign: 'center',
                        }}
                    >
                        <div
                            style={{
                                display: 'inline-block',
                                width: '40px',
                                height: '3px',
                                background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`,
                                borderRadius: '2px',
                                marginBottom: '20px',
                            }}
                        />
                        <h1
                            style={{
                                fontFamily: ff.display,
                                fontSize: 'clamp(24px, 3.5vw, 38px)',
                                fontWeight: 700,
                                color: C.text,
                                margin: '0 0 12px',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.2,
                            }}
                        >
                            Painel Admin
                        </h1>
                        <p style={{ fontFamily: ff.body, fontSize: '15px', color: C.mutedLight, margin: 0, lineHeight: 1.6 }}>
                            Permissões de usuários, cadastros e configuração de formulários
                        </p>

                        <div
                            style={{
                                display: 'inline-flex',
                                gap: '4px',
                                padding: '4px',
                                marginTop: '24px',
                                backgroundColor: C.bg,
                                border: `1px solid ${C.border}`,
                                borderRadius: '100px',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                            }}
                        >
                            {tabs.map((t) => (
                                <button
                                    key={t.key}
                                    type="button"
                                    onClick={() => setTab(t.key)}
                                    className={`adm-tab${tab === t.key ? ' adm-tab--active' : ''}`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
                        {tab === 'users' && <UsersTab />}
                        {tab === 'formPermissions' && <FormPermissionsTab forms={forms} />}
                        {tab === 'termRequirements' && <TermRequirementsTab forms={forms} />}
                    </div>
                </div>
            }
            footerChild={<FooterMain />}
        />
    );
}
