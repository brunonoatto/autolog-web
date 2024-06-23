import LinkButton from '@shared/design-system/ui/link-button';

export function OtherOptionsLogin() {
  return (
    <>
      <div className="flex w-full gap-4 items-center text-muted-foreground ">
        <div className="flex-1 border-t-2 border-muted-foreground" />
        <div>ou</div>
        <div className="flex-1 border-t-2 border-muted-foreground" />
      </div>

      <LinkButton className="w-full mt-6" size="lg" variant="outline" to="/">
        Realizar cadastro
      </LinkButton>
    </>
  );
}
