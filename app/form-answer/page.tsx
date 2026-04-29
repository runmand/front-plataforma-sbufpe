import FormAnswerClient from './FormAnswerClient';

type Props = {
	searchParams?: Promise<{ id?: string }>;
};

export default async function Page({ searchParams }: Props) {
	const params = (await searchParams) ?? {};
	const formId = Number(params.id);

	return <FormAnswerClient formId={formId} />;
}
