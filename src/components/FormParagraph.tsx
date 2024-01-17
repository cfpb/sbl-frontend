interface FormParagraphProperties {
  children: string;
  className: string;
}

/**
 *
 * @returns FormParagraph
 */
function FormParagraph({
  children,
  className,
}: FormParagraphProperties): JSX.Element {
  return <p className={`max-w-[41.875rem] ${className}`}>{children}</p>;
}

export default FormParagraph;
