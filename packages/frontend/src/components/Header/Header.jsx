import React from 'react';
import { motion } from 'framer-motion';
import styles from './Header.module.css';
import phadaLogo from '../../assets/phada-icon.png';

const Header = () => {
  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1 + 0.3,
        type: 'spring',
        stiffness: 120,
      },
    }),
  };

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <img src={phadaLogo} alt="PhadaDB Logo" className={styles.logoImage} />
          <h1>Phada<b>DB</b></h1>
        </div>

        <motion.ul className={styles.navList}>
          {['Produto', 'Planos', 'Documentação', 'Contato'].map((item, i) => (
            <motion.li
              key={item}
              custom={i}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -3 }}
            >
              <a href="#">{item}</a>
            </motion.li>
          ))}
        </motion.ul>

        <div className={styles.actions}>
          <motion.a href="#" className={styles.loginButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Login
          </motion.a>
          <motion.button className={styles.downloadButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Baixar Agora
          </motion.button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;