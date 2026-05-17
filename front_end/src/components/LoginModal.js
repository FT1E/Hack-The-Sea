import { useState, useEffect } from 'react'
import { trackEvent } from '../services/analytics'

export default function LoginModal() {
    const [showModal, setShowModal] = useState(false)
    const [profile, setProfile] = useState(null)
    const [form, setForm] = useState({ age_range: '', gender: '', occupation: '' })



    const handleSubmit = () => {
        localStorage.setItem('userProfile', JSON.stringify(form))
        setProfile(form)
        trackEvent('user_onboarded', form)
        setShowModal(false)
    }

    const isComplete = form.age_range && form.gender && form.occupation

    return (
        <>
            {/* Login button — more visible */}
            <button
                onClick={() => setShowModal(true)}
                style={{
                    position: 'fixed',
                    top: '1.5rem',
                    right: '1.5rem',
                    zIndex: 50,
                    padding: '0.6rem 1.4rem',
                    borderRadius: '50px',
                    border: '1.5px solid rgba(0,229,255,0.7)',
                    background: profile ? 'rgba(0,229,255,0.25)' : 'rgba(0,229,255,0.12)',
                    color: '#00e5ff',
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 0 16px rgba(0,229,255,0.3)',
                    transition: 'all 0.2s',
                }}
            >
                {profile ? `👤 ${profile.occupation}` : '👤 Login'}
            </button>

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    background: 'rgba(4,13,33,0.92)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <div style={{
                        background: 'linear-gradient(145deg, #0a1f44, #040d21)',
                        border: '1px solid rgba(0,229,255,0.2)',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        width: '100%',
                        maxWidth: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.2rem',
                        boxShadow: '0 0 60px rgba(0,229,255,0.1)',
                        position: 'relative',
                    }}>
                        {/* Back button */}
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                position: 'absolute',
                                top: '1.2rem',
                                left: '1.2rem',
                                background: 'none',
                                border: '1px solid rgba(0,229,255,0.2)',
                                borderRadius: '50px',
                                color: 'rgba(0,229,255,0.6)',
                                fontFamily: 'Nunito, sans-serif',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                padding: '0.3rem 0.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                            }}
                        >
                            ← Back
                        </button>

                        {/* Title */}
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌊</div>
                            <h2 style={{
                                fontFamily: 'Baloo 2, cursive',
                                color: '#00e5ff',
                                margin: 0,
                                textShadow: '0 0 20px rgba(0,229,255,0.4)'
                            }}>
                                Who's Diving In?
                            </h2>
                            <p style={{
                                color: 'rgba(232,244,253,0.4)',
                                fontSize: '0.8rem',
                                marginTop: '0.4rem'
                            }}>
                                Optional — helps us improve the experience
                            </p>
                        </div>

                        {/* Form fields */}
                        {[
                            { label: 'Age Range', key: 'age_range', options: ['10-18', '19-30', '31-50', '50+'] },
                            { label: 'Gender', key: 'gender', options: ['Male', 'Female', 'Other', 'Prefer not to say'] },
                            { label: 'Occupation', key: 'occupation', options: ['Student', 'Teacher / Educator', 'Researcher', 'Tourist', 'Other'] }
                        ].map(({ label, key, options }) => (
                            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{
                                    fontSize: '0.65rem',
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(0,229,255,0.5)'
                                }}>
                                    {label}
                                </label>
                                <select
                                    value={form[key]}
                                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(0,229,255,0.2)',
                                        borderRadius: '8px',
                                        padding: '0.6rem 0.8rem',
                                        color: '#e8f4fd',
                                        fontSize: '0.9rem',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        width: '100%'
                                    }}
                                >
                                    <option value="" disabled>Select...</option>
                                    {options.map(o => (
                                        <option key={o} value={o} style={{ background: '#0a1f44' }}>{o}</option>
                                    ))}
                                </select>
                            </div>
                        ))}

                        {/* Buttons */}
                        <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    flex: 1,
                                    padding: '0.9rem',
                                    borderRadius: '50px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'transparent',
                                    color: 'rgba(232,244,253,0.4)',
                                    fontFamily: 'Nunito, sans-serif',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                }}
                            >
                                Skip
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!isComplete}
                                style={{
                                    flex: 2,
                                    padding: '0.9rem',
                                    borderRadius: '50px',
                                    border: 'none',
                                    background: isComplete
                                        ? 'linear-gradient(135deg, #00b4d8, #0077b6)'
                                        : 'rgba(255,255,255,0.05)',
                                    color: isComplete ? '#fff' : 'rgba(255,255,255,0.2)',
                                    fontFamily: 'Baloo 2, cursive',
                                    fontSize: '1rem',
                                    fontWeight: 800,
                                    cursor: isComplete ? 'pointer' : 'not-allowed',
                                    boxShadow: isComplete ? '0 6px 24px rgba(0,180,216,0.4)' : 'none',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Dive In 🐠
                            </button>
                        </div>

                        {/* Clear profile */}
                        {profile && (
                            <button
                                onClick={() => {
                                    localStorage.removeItem('userProfile')
                                    setProfile(null)
                                    setForm({ age_range: '', gender: '', occupation: '' })
                                    setShowModal(false)
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'rgba(255,100,100,0.4)',
                                    fontSize: '0.7rem',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    textDecoration: 'underline'
                                }}
                            >
                                Clear my profile
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}