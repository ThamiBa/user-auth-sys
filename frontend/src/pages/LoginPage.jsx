import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader } from 'react-feather'
import { Link } from 'react-router-dom'


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
    }

    return (
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl
        rounded-2xl shadow-xl overflow-hidden'
      >
        <div className='p-8'>

        </div>
      </motion.div>
    )
  }
  
  export default LoginPage
  