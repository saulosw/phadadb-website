import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h4>Produto</h4>
            <ul>
              <li><a href="#">Visão Geral</a></li>
              <li><a href="#">Recursos</a></li>
              <li><a href="#">Segurança</a></li>
              <li><a href="#">Planos</a></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Recursos</h4>
            <ul>
              <li><a href="#">Documentação</a></li>
              <li><a href="#">Tutoriais</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Suporte</a></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Projeto</h4>
            <ul>
              <li><a href="#">Sobre Mim</a></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Termos de Serviço</a></li>
              <li><a href="#">Política de Privacidade</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.socialIcons}>
            <a href="https://github.com/saulosw" aria-label="GitHub"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/saulo-pereira-jesus/" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} PhadaDB. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;