import LinkButton from '@shared/components/link-button';

import styles from './styles.module.css';
import React from 'react';

type TCardProps = {
  title: string;
  infos: string[];
  price: React.ReactNode;
  linkRoute: string;
  linkText: string;
};
const Card = ({ title, infos, price, linkRoute, linkText }: TCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>{title}</div>

      <ul className={styles.infos}>
        {infos.map((info) => (
          <li>{info}</li>
        ))}
      </ul>

      <div className={styles.price}>{price}</div>

      <LinkButton to={linkRoute}>{linkText}</LinkButton>
    </div>
  );
};

export default Card;
