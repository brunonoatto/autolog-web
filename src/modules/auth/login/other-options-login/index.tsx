import { Button } from '@shared/design-system/ui/button';

export function OtherOptionsLogin() {
  return (
    <>
      <div className="flex w-full gap-4 items-center text-muted-foreground ">
        <div className="flex-1 border-t-2 border-muted-foreground" />
        <div>ou</div>
        <div className="flex-1 border-t-2 border-muted-foreground" />
      </div>

      <Button className="w-full mt-6" size="lg" variant="outline">
        Realizar cadastro
      </Button>
    </>
  );
}
