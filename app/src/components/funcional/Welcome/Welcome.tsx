import { useUser } from "@/store/hooks";

import styles from "./Welcome.module.scss";

const Welcome = () => {
  const { user } = useUser();
  return (
    <div className={styles.welcome}>
      <h1>{`Bienvenido ` + user.name + ` ` + user.paternalLastName}</h1>
    </div>
  );
};

export default Welcome;
