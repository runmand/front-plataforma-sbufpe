export const escapeRegExp = (text: string): string => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const extractTextBetweenTags = (
  text: string,
  startTag: string,
  endTag: string
): string[] | null => {
  const regex = new RegExp(
    `${escapeRegExp(startTag)}([\\s\\S]*?)${escapeRegExp(endTag)}`
  );
  const match = regex.exec(text);
  const contentBetweenTags = match ? match[1] : null;

  if (contentBetweenTags) {
    return contentBetweenTags.split("**");
  } else {
    return null;
  }
};

export const extractHeader = (text: string): string => {
  const regex = /_h_(.*?)_h_/;
  const match = regex.exec(text);
  return match ? match[1] : "";
};
