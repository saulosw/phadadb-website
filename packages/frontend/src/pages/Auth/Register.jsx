import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import formStyles from './Register.module.css';
import authStyles from './Auth.module.css';
import sideImage from '../../assets/registerSideImage.png';

import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const PasswordRequirement = ({ met, text }) => (
  <li className={`${formStyles.requirementItem} ${met ? formStyles.met : ''}`}>
    <span className={formStyles.icon}>{met ? <FaCheckCircle /> : <FaTimesCircle />}</span> {text}
  </li>
);

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [validation, setValidation] = useState({
    minLength: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    passwordsMatch: false,
  });

  useEffect(() => {
    setValidation({
      minLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      passwordsMatch: password !== '' && password === confirmPassword,
    });
  }, [password, confirmPassword]);


  async function signIn(userData) {
    const response = await fetch('http://localhost:3000/auth/signIn', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch');
    }
    return response.json();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const isFormValid = Object.values(validation).every(Boolean);
    if (isFormValid) {
      const userData = { fullName, email, password }
      try {
        const signInResult = await signIn(userData);
        if (signInResult) {
          console.log('Account created with success:', signInResult);
          navigate('/login');
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Please ensure all password requirements are met.");
    }
  };

  return (
    <div className={authStyles.authContainer}>
      <div className={authStyles.sideImageContent}>
        <img src={sideImage} alt='sideImage' className={authStyles.sideImage} />
      </div>

      <div className={authStyles.formSide}>
        <motion.div
          className={formStyles.formWrapper}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className={formStyles.title}>Crie sua Conta</h2>
          <p className={formStyles.subtitle}>Comece a usar o PhadaDB hoje mesmo</p>

          <form onSubmit={handleSubmit} className={formStyles.form}>
            <div className={formStyles.inputGroup}>
              <label htmlFor="fullName">Nome Completo</label>
              <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Seu nome completo" required />
            </div>

            <div className={formStyles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" required />
            </div>

            <div className={formStyles.inputGroup}>
              <label htmlFor="password">Senha</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Crie uma senha forte" required />
            </div>

            <div className={formStyles.inputGroup}>
              <label htmlFor="confirmPassword">Confirme a Senha</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repita a senha" required />
            </div>

            <motion.div
              className={formStyles.requirements}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: password ? 1 : 0, height: password ? 'auto' : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className={formStyles.requirementsList}>
                <PasswordRequirement met={validation.minLength} text="Pelo menos 8 caracteres" />
                <PasswordRequirement met={validation.hasUpper} text="Pelo menos uma letra maiúscula" />
                <PasswordRequirement met={validation.hasLower} text="Pelo menos uma letra minúscula" />
                <PasswordRequirement met={validation.hasNumber} text="Pelo menos um número" />
                <PasswordRequirement met={validation.passwordsMatch} text="As senhas coincidem" />
              </ul>
            </motion.div>

            <motion.button type="submit" className={formStyles.submitButton} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Criar Conta
            </motion.button>
          </form>

          {error && <p className={formStyles.errorMessage}>{error}</p>}

          <p className={formStyles.switchFormText}>
            Já tem uma conta?{' '}
            <Link to="/login" className={formStyles.switchLink}>Login</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;