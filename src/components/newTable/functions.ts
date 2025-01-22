export function removeDuplicates(stringsArray: string[]): string[] {
  return Array.from(new Set(stringsArray));
}

export function capitalizeFirstLetter(text: string): string {
  if (!text) return ""; // Verifica se a string é válida
  const lowerCaseText = text.toLowerCase(); // Converte toda a string para minúsculas
  return lowerCaseText.charAt(0).toUpperCase() + lowerCaseText.slice(1); // Primeira letra maiúscula
}

export function filterBy(variable: string, filter: string, find: string) {
  if (variable == "*"){
    return true;
  }else{
    if (variable.toLocaleLowerCase().search(`${find}: ${filter.toLocaleLowerCase()}`) != -1) return true;
    else return false;
  }
}