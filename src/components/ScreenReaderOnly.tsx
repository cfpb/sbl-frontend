function ScreenReaderOnly({ children }: { children: string }): JSX.Element {
  return (
    <>
      &nbsp;
      <span className='sr-only'>{children}</span>
    </>
  );
}

export default ScreenReaderOnly;
