"use client";

import { useState, forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

const slideVariants = {
  enter: (dir) => ({ x: dir * 28, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.22, ease: "easeOut" } },
  exit: (dir) => ({ x: dir * -28, opacity: 0, transition: { duration: 0.16, ease: "easeIn" } }),
};

const Input = forwardRef(function Input({ label, optional, ...props }, ref) {
  return (
    <div>
      <label className="block text-[11px] font-heading font-semibold tracking-wide uppercase text-white/40 mb-1.5">
        {label}
        {optional && <span className="normal-case tracking-normal font-normal ml-1 text-white/25">(opcional)</span>}
      </label>
      <input
        ref={ref}
        className="w-full bg-white/[0.05] border border-white/[0.08] hover:border-white/[0.14] focus:border-accent/50 rounded-xl px-4 py-2.5 text-white placeholder:text-white/20 text-sm outline-none transition-colors duration-200"
        {...props}
      />
    </div>
  );
});

function LoginForm({ onSwitch }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log("login", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="font-heading font-extrabold text-white text-2xl mb-1">Bienvenido</h2>
        <p className="text-white/40 text-sm">Ingresá a tu portal de cliente</p>
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="tu@email.com"
        {...register("email", { required: true })}
      />
      <Input
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        {...register("contrasena", { required: true })}
      />

      <button type="submit" className="btn-gradient w-full py-3 rounded-xl font-heading font-semibold text-sm mt-2">
        Ingresar
      </button>

      <p className="text-center text-sm text-white/35 pt-1">
        ¿No tenés cuenta?{" "}
        <button type="button" onClick={onSwitch} className="text-accent-subtle hover:text-white transition-colors font-semibold">
          Creá una
        </button>
      </p>
    </form>
  );
}

function RegisterForm({ onSwitch }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log("register", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="font-heading font-extrabold text-white text-2xl mb-1">Crear cuenta</h2>
        <p className="text-white/40 text-sm">Completá tus datos para empezar</p>
      </div>

      {/* Fila 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Input label="Nombre" placeholder="Juan" {...register("nombre", { required: true })} />
        <Input label="Apellido" placeholder="García" {...register("apellido", { required: true })} />
        <Input label="Email" type="email" placeholder="tu@email.com" {...register("email", { required: true })} />
      </div>

      {/* Fila 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Teléfono" type="tel" placeholder="+54 9 11..." {...register("telefono", { required: true })} />
        <Input label="Contraseña" type="password" placeholder="••••••••" {...register("contrasena", { required: true })} />
      </div>

      {/* Empresa opcional */}
      <Input label="Empresa" placeholder="Tu empresa S.A." optional {...register("empresa")} />

      <button type="submit" className="btn-gradient w-full py-3 rounded-xl font-heading font-semibold text-sm">
        Crear cuenta
      </button>

      <p className="text-center text-sm text-white/35 pt-1">
        ¿Ya tenés cuenta?{" "}
        <button type="button" onClick={onSwitch} className="text-accent-subtle hover:text-white transition-colors font-semibold">
          Ingresá
        </button>
      </p>
    </form>
  );
}

export default function AuthCard() {
  const [mode, setMode] = useState("login");
  const [dir, setDir] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const switchTo = (next) => {
    setDir(next === "register" ? 1 : -1);
    setMode(next);
  };

  const cardMaxWidth = isDesktop
    ? (mode === "login" ? "28rem" : "46rem")
    : "100%";

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } }}
      style={{ maxWidth: cardMaxWidth }}
      className="glass-strong rounded-2xl overflow-hidden mx-auto w-full"
    >
      <div className="p-8">
        <AnimatePresence mode="wait" custom={dir}>
          {mode === "login" ? (
            <motion.div key="login" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit">
              <LoginForm onSwitch={() => switchTo("register")} />
            </motion.div>
          ) : (
            <motion.div key="register" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit">
              <RegisterForm onSwitch={() => switchTo("login")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
