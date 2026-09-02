'use client';

import Base from '@components/base-layout/index';
import React, { useEffect, useState } from 'react';
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

const ff = {
    display: "'Lora', Georgia, serif",
    body: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif",
};
const C = {
    primary: '#6D141A',
    secondary: '#921c22',
    bg: '#FAF7F2',
    white: '#fff',
    text: '#1c1917',
    muted: '#a8a29e',
    border: '#e7e5e4',
};

const TERM_VARIANTS: TERM_VARIANT[] = ['TCLE', 'TCLE2', 'TCLEPROF', 'TCLEUSAB', 'TALE18', 'TALEU13'];

const inputStyle: React.CSSProperties = {
    padding: '9px 12px',
    borderRadius: '8px',
    border: `1.5px solid ${C.border}`,
    fontSize: '13px',
    fontFamily: ff.body,
    outline: 'none',
    color: C.text,
    backgroundColor: C.white,
};

const btnStyle: React.CSSProperties = {
    padding: '9px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: C.primary,
    color: C.white,
    fontSize: '13px',
    fontWeight: 700,
    fontFamily: ff.body,
    cursor: 'pointer',
};

// `src/css/index.css` tem uma regra global `input[type="checkbox"] { display: none; }`
// (feita pra um outro componente que usa radio/checkbox escondido + label estilizado)
// que também apaga QUALQUER checkbox nativo do site, inclusive os daqui — por isso as
// marcações da matriz não apareciam. Estilo inline tem prioridade sobre a regra da
// classe, então isso religa a exibição só nestes checkboxes, sem tocar no CSS global.
const checkboxStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    cursor: 'pointer',
    accentColor: C.primary,
};

// `<th>`/`<td>` não herdam uma cor legível do global CSS neste app — sem isso
// o texto das tabelas fica quase invisível sobre o fundo claro do painel.
const thStyle: React.CSSProperties = {
    padding: '10px',
    color: C.text,
    fontWeight: 700,
};
const tdStyle: React.CSSProperties = {
    padding: '10px',
    color: C.text,
};

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

    return (
        <div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                    style={{ ...inputStyle, flex: 1, minWidth: '220px' }}
                    placeholder="Buscar por login, e-mail, CPF ou celular..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && load()}
                />
                <button style={btnStyle} onClick={load}>
                    Buscar
                </button>
                <button style={{ ...btnStyle, backgroundColor: C.white, color: C.primary, border: `1.5px solid ${C.primary}` }} onClick={() => setShowCreate((v) => !v)}>
                    {showCreate ? 'Cancelar' : '+ Novo usuário'}
                </button>
            </div>

            {showCreate && (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '20px', padding: '16px', border: `1.5px solid ${C.border}`, borderRadius: '12px', backgroundColor: C.white }}>
                    <input style={inputStyle} placeholder="Login (CPF/celular/e-mail/username)" value={form.login} onChange={(e) => setForm({ ...form, login: e.target.value })} />
                    <input style={inputStyle} placeholder="E-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <input style={inputStyle} placeholder="Senha" type="password" value={form.pwd} onChange={(e) => setForm({ ...form, pwd: e.target.value })} />
                    <select style={inputStyle} value={form.typeId} onChange={(e) => setForm({ ...form, typeId: e.target.value })}>
                        <option value="">Tipo...</option>
                        {types.map((t) => (
                            <option key={String(t.id)} value={String(t.id)}>
                                {t.description}
                            </option>
                        ))}
                    </select>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontFamily: ff.body, color: C.text }}>
                        <input style={checkboxStyle} type="checkbox" checked={form.isTest} onChange={(e) => setForm({ ...form, isTest: e.target.checked })} />
                        Conta de teste
                    </label>
                    <button style={btnStyle} disabled={creating} onClick={handleCreate}>
                        {creating ? 'Salvando...' : 'Cadastrar'}
                    </button>
                </div>
            )}

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: ff.body, fontSize: '13px' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: `2px solid ${C.border}` }}>
                            <th style={thStyle}>Login</th>
                            <th style={thStyle}>E-mail</th>
                            <th style={thStyle}>Tipo</th>
                            <th style={thStyle}>Teste</th>
                            <th style={thStyle}>Trocar tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={String(u.id)} style={{ borderBottom: `1px solid ${C.border}` }}>
                                <td style={tdStyle}>{u.cpf ? maskCpfDisplay(u.cpf) : u.cellphone || u.username || '—'}</td>
                                <td style={tdStyle}>{u.email || '—'}</td>
                                <td style={tdStyle}>{typeLabel(u.typeId)}</td>
                                <td style={tdStyle}>{u.isTest ? 'Sim' : 'Não'}</td>
                                <td style={tdStyle}>
                                    <select
                                        style={inputStyle}
                                        defaultValue={String(typeIdOf(u.typeId) ?? '')}
                                        onChange={(e) => handleUpdateType(u.id, e.target.value)}
                                    >
                                        {types.map((t) => (
                                            <option key={String(t.id)} value={String(t.id)}>
                                                {t.description}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: C.muted }}>
                                    Nenhum usuário encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
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

    return (
        <div>
            <p style={{ fontFamily: ff.body, fontSize: '13px', color: C.muted, marginBottom: '16px' }}>
                Admin e Desenvolvedor sempre têm acesso total, independente desta matriz — ela só vale pros demais tipos. A ausência de
                marcação significa acesso negado.
            </p>
            <select style={{ ...inputStyle, marginBottom: '20px' }} value={String(formId)} onChange={(e) => setFormId(e.target.value)}>
                {forms.map((f) => (
                    <option key={String(f.id)} value={String(f.id)}>
                        {f.title}
                    </option>
                ))}
            </select>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: ff.body, fontSize: '13px' }}>
                <thead>
                    <tr style={{ textAlign: 'left', borderBottom: `2px solid ${C.border}` }}>
                        <th style={thStyle}>Tipo de usuário</th>
                        <th style={thStyle}>Pode ver</th>
                        <th style={thStyle}>Pode responder</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r) => (
                        <tr key={String(r.typeId)} style={{ borderBottom: `1px solid ${C.border}` }}>
                            <td style={tdStyle}>{r.typeDescription}</td>
                            <td style={tdStyle}>
                                <input style={checkboxStyle} type="checkbox" checked={r.canView} onChange={() => toggle(r, 'canView')} />
                            </td>
                            <td style={tdStyle}>
                                <input style={checkboxStyle} type="checkbox" checked={r.canAnswer} onChange={() => toggle(r, 'canAnswer')} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
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
        gap: '6px',
        padding: '7px 12px',
        borderRadius: '100px',
        border: `1.5px solid ${checked ? C.primary : C.border}`,
        backgroundColor: checked ? 'rgba(109,20,26,0.06)' : C.white,
        color: checked ? C.primary : C.text,
        fontSize: '12px',
        fontFamily: ff.body,
        cursor: busy ? 'default' : 'pointer',
    });

    return (
        <div>
            <p style={{ fontFamily: ff.body, fontSize: '13px', color: C.muted, marginBottom: '20px', lineHeight: 1.6, maxWidth: '720px' }}>
                Aqui você decide quais termos de consentimento a pessoa precisa assinar antes de responder este formulário, e pode
                variar por tipo de usuário. Pra cada tipo pode existir mais de uma <strong>forma de consentimento</strong> — a pessoa
                só precisa completar UMA delas, não todas. Serve, por exemplo, pra separar o caso de um adulto (assina só um termo) do
                caso de um menor de idade (assina dois termos diferentes) no mesmo formulário.
            </p>

            <select style={{ ...inputStyle, marginBottom: '20px' }} value={String(formId)} onChange={(e) => setFormId(e.target.value)}>
                {forms.map((f) => (
                    <option key={String(f.id)} value={String(f.id)}>
                        {f.title}
                    </option>
                ))}
            </select>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: C.text, marginBottom: '6px', fontFamily: ff.body }}>
                    Pra qual tipo de usuário?
                </label>
                <select style={inputStyle} value={viewTypeId} onChange={(e) => setViewTypeId(e.target.value)}>
                    <option value="default">Padrão (qualquer tipo sem regra própria)</option>
                    {types.map((t) => (
                        <option key={String(t.id)} value={String(t.id)}>
                            {t.description}
                        </option>
                    ))}
                </select>
            </div>

            {viewTypeId !== 'default' && (
                <div
                    style={{
                        padding: '12px 16px',
                        borderRadius: '10px',
                        marginBottom: '20px',
                        fontSize: '13px',
                        fontFamily: ff.body,
                        lineHeight: 1.5,
                        maxWidth: '720px',
                        backgroundColor: rowsForView.length > 0 ? 'rgba(217,119,6,0.08)' : 'rgba(107,114,128,0.06)',
                        color: rowsForView.length > 0 ? '#92400e' : C.muted,
                        border: `1px solid ${rowsForView.length > 0 ? 'rgba(217,119,6,0.25)' : C.border}`,
                    }}
                >
                    {rowsForView.length > 0 ? (
                        <>
                            ⚠ <strong>{selectedType?.description}</strong> tem regra própria aqui — ela substitui completamente a regra
                            &quot;Padrão&quot; do formulário, só pra esse tipo.
                        </>
                    ) : (
                        <>
                            <strong>{selectedType?.description}</strong> ainda não tem regra própria — está seguindo a regra
                            &quot;Padrão&quot; deste formulário. Só configure algo aqui se esse tipo precisar de algo DIFERENTE do
                            padrão.
                        </>
                    )}
                </div>
            )}

            <label
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: `1.5px solid ${isExempt ? C.primary : C.border}`,
                    backgroundColor: isExempt ? 'rgba(109,20,26,0.04)' : C.white,
                    marginBottom: '20px',
                    cursor: busy ? 'default' : 'pointer',
                    fontFamily: ff.body,
                    maxWidth: '720px',
                }}
            >
                <input style={checkboxStyle} type="checkbox" checked={isExempt} disabled={busy} onChange={handleToggleExempt} />
                <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: C.text }}>Isento — não precisa assinar nada</div>
                    <div style={{ fontSize: '12px', color: C.muted }}>
                        Marque se esse tipo de usuário pode responder este formulário sem assinar termo nenhum.
                    </div>
                </div>
            </label>

            {!isExempt && (
                <div style={{ opacity: busy ? 0.6 : 1, maxWidth: '720px' }}>
                    {pathGroups.length === 0 && !creatorOpen && (
                        <p style={{ fontSize: '13px', color: C.muted, fontFamily: ff.body, marginBottom: '16px', lineHeight: 1.5 }}>
                            Nenhuma forma de consentimento configurada — do jeito que está hoje, ninguém desse tipo precisa assinar
                            nada pra responder este formulário.
                        </p>
                    )}

                    {pathGroups.map((group, i) => (
                        <React.Fragment key={group.pathKey}>
                            {i > 0 && (
                                <div style={{ textAlign: 'center', margin: '14px 0', fontSize: '12px', fontWeight: 700, color: C.muted, letterSpacing: '0.05em', fontFamily: ff.body }}>
                                    — OU —
                                </div>
                            )}
                            <div style={{ border: `1.5px solid ${C.border}`, borderRadius: '12px', padding: '18px 20px', backgroundColor: C.white, marginBottom: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '10px' }}>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 700, color: C.text, fontFamily: ff.body }}>{group.pathKey}</div>
                                        <div style={{ fontSize: '12px', color: C.muted, fontFamily: ff.body }}>
                                            Precisa assinar TODOS os documentos marcados abaixo
                                        </div>
                                    </div>
                                    <button
                                        style={{ ...btnStyle, backgroundColor: '#fff', color: '#b91c1c', border: '1.5px solid #b91c1c', padding: '5px 10px', fontSize: '12px', flexShrink: 0 }}
                                        onClick={() => handleRemovePath(group.pathKey)}
                                        disabled={busy}
                                    >
                                        Remover esta forma
                                    </button>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {TERM_VARIANTS.map((v) => {
                                        const checked = group.rows.some((r) => r.variant === v);
                                        return (
                                            <label key={v} style={docChipStyle(checked)}>
                                                <input
                                                    style={{ ...checkboxStyle, width: '13px', height: '13px' }}
                                                    type="checkbox"
                                                    checked={checked}
                                                    disabled={busy}
                                                    onChange={() => handleToggleDocInGroup(group.pathKey, v)}
                                                />
                                                <span>
                                                    <strong>{TERM_VARIANT_LABEL[v].title}</strong> — {TERM_VARIANT_LABEL[v].subtitle}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        </React.Fragment>
                    ))}

                    {creatorOpen ? (
                        <div style={{ border: `1.5px dashed ${C.primary}`, borderRadius: '12px', padding: '18px 20px', backgroundColor: 'rgba(109,20,26,0.03)' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: C.text, marginBottom: '6px', fontFamily: ff.body }}>
                                Nome desta forma de consentimento (ex.: &quot;Adulto&quot;, &quot;Menor de 13 a 18 anos&quot;)
                            </label>
                            <input
                                style={{ ...inputStyle, width: '100%', maxWidth: '320px', marginBottom: '14px' }}
                                value={creatorName}
                                onChange={(e) => setCreatorName(e.target.value)}
                            />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                                {TERM_VARIANTS.map((v) => {
                                    const checked = creatorVariants.includes(v);
                                    return (
                                        <label key={v} style={docChipStyle(checked)}>
                                            <input
                                                style={{ ...checkboxStyle, width: '13px', height: '13px' }}
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() =>
                                                    setCreatorVariants((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))
                                                }
                                            />
                                            <span>
                                                <strong>{TERM_VARIANT_LABEL[v].title}</strong> — {TERM_VARIANT_LABEL[v].subtitle}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button style={btnStyle} onClick={handleCreatePath} disabled={busy}>
                                    Salvar forma
                                </button>
                                <button
                                    style={{ ...btnStyle, backgroundColor: '#fff', color: C.muted, border: `1.5px solid ${C.border}` }}
                                    onClick={() => setCreatorOpen(false)}
                                    disabled={busy}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button style={{ ...btnStyle, backgroundColor: '#fff', color: C.primary, border: `1.5px solid ${C.primary}` }} onClick={openCreator} disabled={busy}>
                            + Adicionar forma de consentimento
                        </button>
                    )}
                </div>
            )}
        </div>
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
                    {/* Hero header */}
                    <div style={{ backgroundColor: C.white, borderBottom: `1px solid ${C.border}`, padding: '72px 24px 40px', marginBottom: '40px', textAlign: 'center' }}>
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
                        <h1 style={{ fontFamily: ff.display, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 700, color: C.text, margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                            Painel Admin
                        </h1>
                        <p style={{ fontFamily: ff.body, fontSize: '15px', color: C.muted, margin: 0, lineHeight: 1.6 }}>
                            Permissões de usuários, cadastros e configuração de formulários
                        </p>

                        <div style={{ display: 'inline-flex', gap: '4px', padding: '4px', marginTop: '24px', backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: '100px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {tabs.map((t) => (
                                <button
                                    key={t.key}
                                    type="button"
                                    onClick={() => setTab(t.key)}
                                    style={{
                                        padding: '7px 18px',
                                        borderRadius: '100px',
                                        border: 'none',
                                        backgroundColor: tab === t.key ? C.primary : 'transparent',
                                        color: tab === t.key ? C.white : C.muted,
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        fontFamily: ff.body,
                                        cursor: 'pointer',
                                    }}
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
