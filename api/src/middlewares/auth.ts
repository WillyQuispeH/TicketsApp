const auth = (req: any, res: any, next: any) => {
  if (req.headers.id !== "957902342") {
    res.status(401).json({ message: "Acceso no autorizado" });
    return;
  }
  return next();
};

export { auth };
