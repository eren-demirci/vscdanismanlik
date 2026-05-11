'use client';

import { useState, useRef } from 'react';
import Icons from './Icons';
import DrawerOpener from './DrawerOpener';

const KariyerModal = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const clearMessage = (time: number) => {
    setTimeout(() => {
      setMessage('');
      setStatus('');
    }, time);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setLoading(true);
    try {
      const response = await fetch('/api/kariyer', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(result.message);
        form.reset();
        setFileName('');
        clearMessage(6000);
      } else {
        setStatus('error');
        setMessage(result.error);
        clearMessage(4000);
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message);
      clearMessage(4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <modal-kariyer className="theme-modal modal-kariyer">
      <div className="modal-container">
        <div className="modal-header">
          <DrawerOpener cls="kariyer-close svg-wrapper" data-drawer=".modal-kariyer">
            <Icons.CloseCircle />
          </DrawerOpener>
        </div>

        <div className="modal-main">
          <div className="kariyer-form-wrap">
            <h2 className="kariyer-title text text-40 fw-700">Kariyer Başvurusu</h2>
            <p className="kariyer-subtitle text text-16">
              Formu doldurun ve CV'nizi yükleyin, ekibimiz sizinle iletişime geçsin.
            </p>

            <form
              ref={formRef}
              className="kariyer-form"
              onSubmit={handleSubmit}
            >
              <div className="kariyer-row">
                <div className="kariyer-field">
                  <label htmlFor="kariyer-ad" className="kariyer-label text text-14">Ad *</label>
                  <input
                    id="kariyer-ad"
                    type="text"
                    name="ad"
                    placeholder="Adınız"
                    className="kariyer-input text text-16"
                    required
                  />
                </div>
                <div className="kariyer-field">
                  <label htmlFor="kariyer-soyad" className="kariyer-label text text-14">Soyad *</label>
                  <input
                    id="kariyer-soyad"
                    type="text"
                    name="soyad"
                    placeholder="Soyadınız"
                    className="kariyer-input text text-16"
                    required
                  />
                </div>
              </div>

              <div className="kariyer-row">
                <div className="kariyer-field">
                  <label htmlFor="kariyer-email" className="kariyer-label text text-14">E-posta *</label>
                  <input
                    id="kariyer-email"
                    type="email"
                    name="email"
                    placeholder="ornek@mail.com"
                    className="kariyer-input text text-16"
                    required
                  />
                </div>
                <div className="kariyer-field">
                  <label htmlFor="kariyer-telefon" className="kariyer-label text text-14">Telefon *</label>
                  <input
                    id="kariyer-telefon"
                    type="tel"
                    name="telefon"
                    placeholder="+90 5XX XXX XX XX"
                    className="kariyer-input text text-16"
                    required
                  />
                </div>
              </div>

              <div className="kariyer-field kariyer-field-full">
                <label htmlFor="kariyer-pozisyon" className="kariyer-label text text-14">Başvurulan Pozisyon</label>
                <input
                  id="kariyer-pozisyon"
                  type="text"
                  name="pozisyon"
                  placeholder="Hangi pozisyon için başvuruyorsunuz?"
                  className="kariyer-input text text-16"
                />
              </div>

              <div className="kariyer-field kariyer-field-full">
                <label htmlFor="kariyer-mesaj" className="kariyer-label text text-14">Ön Yazı / Mesaj</label>
                <textarea
                  id="kariyer-mesaj"
                  name="mesaj"
                  placeholder="Kendinizden kısaca bahsedin..."
                  className="kariyer-input kariyer-textarea text text-16"
                  rows={4}
                />
              </div>

              <div className="kariyer-field kariyer-field-full">
                <label htmlFor="kariyer-cv" className="kariyer-label text text-14">CV Yükle *</label>
                <label htmlFor="kariyer-cv" className="kariyer-file-label">
                  <span className="kariyer-file-icon">
                    <Icons.ArrowCircle />
                  </span>
                  <span className="kariyer-file-text text text-16">
                    {fileName || 'PDF, DOC veya DOCX (max 10MB)'}
                  </span>
                  <input
                    id="kariyer-cv"
                    type="file"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    className="kariyer-file-input"
                    required
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setFileName(file ? file.name : '');
                    }}
                  />
                </label>
              </div>

              <div className="kariyer-submit">
                <button
                  type="submit"
                  className="button button--primary"
                  disabled={loading}
                  aria-label="Başvuruyu Gönder"
                >
                  {loading ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
                </button>
              </div>

              {status === 'success' && (
                <p className="kariyer-msg kariyer-msg--success text text-16">{message}</p>
              )}
              {status === 'error' && (
                <p className="kariyer-msg kariyer-msg--error text text-16">{message}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </modal-kariyer>
  );
};

export default KariyerModal;
