const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="background h-screen flex items-center justify-center">{children}</div>
  );
};

export default AuthenticationLayout;
