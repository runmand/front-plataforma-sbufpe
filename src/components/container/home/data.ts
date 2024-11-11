import { containerBodyTypeEnum, routerEnum } from 'src/core/enums';

export const items = [
  {
    id: 1,
    subject: 'Novidades',
    subTitle: 'Questionários',
    description: 'Responda aos questionários de acordo com seu perfil e necessidade.',
    url: routerEnum.FORM
  },
  {
    id: 2,
    subject: 'Referências',
    subTitle: 'Objetos de Estudos',
    description: 'Saiba quais referências foram utilizadas para a elaboração dos questionários disponíveis no projeto.',
    url: routerEnum.ARTICLES,
  },
  {
    id: 3,
    subject: 'Contato',
    subTitle: 'Entre em contato conosco',
    description:
      'Tem dúvidas sobre o projeto, questionários, assuntos relacionados ou gostaria de contribuir? Acesse a página de contatos e nos mande suas dúvidas.',
    url: routerEnum.CONTACTUS,
  },
];