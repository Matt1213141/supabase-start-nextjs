import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  fields: { label: string; name: string; type?: string }[];
  onSubmit: (values: Record<string, string>) => void;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title = 'Authentication', fields, onSubmit }) => {
  const [formValues, setFormValues] = React.useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    fields.forEach(f => { initial[f.name] = ''; });
    return initial;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ minWidth: 320, padding: 32, border: '1px solid #eee', borderRadius: 8, background: '#fff', boxShadow: '0 2px 8px #eee' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>{title}</h2>
        {fields.map(field => (
          <div key={field.name} style={{ marginBottom: 16 }}>
            <label htmlFor={field.name} style={{ display: 'block', marginBottom: 4 }}>{field.label}</label>
            <input
              id={field.name}
              name={field.name}
              type={field.type || 'text'}
              value={formValues[field.name]}
              onChange={handleChange}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              required
            />
          </div>
        ))}
        <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 4, background: '#0070f3', color: '#fff', border: 'none', fontWeight: 600, fontSize: 16 }}>
          Submit
        </button>
        {children}
      </form>
    </div>
  );
};

export default AuthLayout;
