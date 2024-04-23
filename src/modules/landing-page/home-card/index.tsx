import { TRoute } from '@core/router/consts';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/design-system/ui/card';
import LinkButton from '@shared/design-system/ui/link-button';

type TCardProps = {
  title: string;
  infos: string[];
  price: React.ReactNode;
  linkRoute: TRoute;
  linkText: string;
};
const HomeCard = ({ title, infos, price, linkRoute, linkText }: TCardProps) => {
  return (
    <>
      <Card className="w-full md:w-2/3" border>
        <CardHeader>
          <CardTitle alignTitle="center">{title}</CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="list-disc p-6 pr-1 flex-1">
            {infos.map((info) => (
              <li key={info}>{info}</li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="flex-col" align="center">
          <div>{price}</div>
          <LinkButton to={linkRoute} className="w-full">
            {linkText}
          </LinkButton>
        </CardFooter>
      </Card>
    </>
  );
};

export default HomeCard;
