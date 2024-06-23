import HomeLink from '@layout/body-app/header/home-link';
import { WithoutLoginMain } from '@layout/without-login-main';
import { LoginForm } from '@modules/auth/login/login-form';
import { OtherOptionsLogin } from '@modules/auth/login/other-options-login';

export default function Login() {
  return (
    <WithoutLoginMain className="max-w-[500px]">
      <HomeLink center />

      <LoginForm />

      <OtherOptionsLogin />
    </WithoutLoginMain>
  );
}
