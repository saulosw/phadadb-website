import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import formStyles from './Login.module.css';
import authStyles from './Auth.module.css';
import sideImage from '../../assets/loginSideImage.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function login(userData) {
    const response = await fetch('http://localhost:3000/auth/login', {
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
    const userData = { email, password }
    try {
      const loginResult = await login(userData)
      if (loginResult) {
        console.log("Login success: ", loginResult)
        navigate("/")
      }

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={authStyles.authContainer}>
      <div className={authStyles.formSide}>
        <motion.div
          className={formStyles.formWrapper}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className={formStyles.title}>Seja Bem-vindo de Volta</h2>
          <p className={formStyles.subtitle}>Acesse sua conta PhadaDB</p>

          <form onSubmit={handleSubmit} className={formStyles.form}>
            <div className={formStyles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className={formStyles.inputGroup}>
              <label htmlFor="password">Senha</label>
              <div className={formStyles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  required
                />
                <span onClick={() => setShowPassword(!showPassword)} className={formStyles.eyeIcon}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <Link to="/forgot-password" className={formStyles.forgotPassword}>Esqueceu a senha?</Link>
            </div>

            <motion.button
              type="submit"
              className={formStyles.submitButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          </form>

          {error && <p className={formStyles.errorMessage}>{error}</p>}

          <p className={formStyles.switchFormText}>
            Não tem uma conta?{' '}
            <Link to="/register" className={formStyles.switchLink}>Cadastre-se</Link>
          </p>
        </motion.div>
      </div>
      <div className={authStyles.sideImageContent}>
        <img src={sideImage} alt='login-right-image' className={authStyles.sideImage}></img>
      </div>
    </div>
  );
};

export default Login;