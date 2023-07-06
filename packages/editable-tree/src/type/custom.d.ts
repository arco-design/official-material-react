declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.md' {
  const content: any;
  export default content;
}

declare module '*.less' {
  const content: { [key: string]: string };
  export default content;
}
declare module '*.png' {
  const content: string;
  export default content;
}
declare module '*.txt' {
  const contents: string;
  export = contents;
}
