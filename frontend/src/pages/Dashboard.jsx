import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Plus, Calendar, Activity, Home } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import toast from 'react-hot-toast';
import { getStageColor } from '../utils/stageColors';

import { plantsApi } from '../utils/api';

const STAGE_CONFIG = {
  seedling: { emoji: '🌱', label: 'Seedling' },
  vegetative: { emoji: '🌿', label: 'Vegetative' },
  flowering: { emoji: '🌸', label: 'Flowering' },
  harvest: { emoji: '🌾', label: 'Harvest' },
  cured: { emoji: '📦', label: 'Cured' }
};

const Dashboard = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [environmentData, setEnvironmentData] = useState([]);

  useEffect(() => {
    fetchPlants();
    fetchLatestEnvironmentDataPerTent();
  }, []);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const plantsData = await plantsApi.getAll();
      setPlants(plantsData);
    } catch {
      toast.error('Failed to load plants');
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestEnvironmentDataPerTent = async () => {
    try {
      // Force no cache
      const response = await fetch('/api/environment/latest-per-tent', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setEnvironmentData(data || []);
        return;
      }
      
      // Fallback: try direct URL
      const directResponse = await fetch('http://localhost:5000/api/environment/latest-per-tent');
      if (directResponse.ok) {
        const directData = await directResponse.json();
        setEnvironmentData(directData || []);
        return;
      }
      
      // Last resort fallback
      const fallbackResponse = await fetch('/api/environment/latest');
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        setEnvironmentData(fallbackData && Object.keys(fallbackData).length > 0 ? [fallbackData] : []);
      }
      
    } catch {
      setEnvironmentData([]);
    }
  };

  const getStageConfig = (stage) => {
    return STAGE_CONFIG[stage] || STAGE_CONFIG.seedling;
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '16px',
        border: '1px solid var(--border)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}>
        {/* Quantum Loading Animation */}
        <div style={{
          position: 'relative',
          width: '80px',
          height: '80px'
        }}>
          {/* Main rotating ring */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: '3px solid transparent',
            borderTop: '3px solid var(--primary-color)',
            borderRadius: '50%',
            animation: 'quantumSpin 1.2s linear infinite'
          }}></div>
          
          {/* Secondary ring */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            width: 'calc(100% - 20px)',
            height: 'calc(100% - 20px)',
            border: '2px solid transparent',
            borderRight: '2px solid #4ade80',
            borderRadius: '50%',
            animation: 'quantumSpin 1s linear infinite reverse'
          }}></div>
          
          {/* Core */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            background: 'radial-gradient(circle, var(--primary-color), transparent)',
            borderRadius: '50%',
            animation: 'quantumPulse 2s ease-in-out infinite'
          }}></div>
          
          {/* Particles */}
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '4px',
              height: '4px',
              background: 'var(--primary-color)',
              borderRadius: '50%',
              transformOrigin: '0 0',
              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateX(40px)`,
              animation: `particleFloat 3s ease-in-out infinite ${i * 0.2}s`,
              opacity: 0.7
            }}></div>
          ))}
        </div>
        
        <div style={{
          marginLeft: '2rem',
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          fontWeight: '500',
          textShadow: '0 0 20px rgba(74, 222, 128, 0.3)',
          animation: 'textGlow 2s ease-in-out infinite alternate'
        }}>
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Ultra-Modern Header */}
      <header className="dashboard-header" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
        <div className="header-content">
          <div className="header-text">
            <h1 className="dashboard-title">
              <Sprout className="w-8 h-8" style={{ display: 'inline-block', marginRight: '0.75rem', verticalAlign: 'middle' }} />
              Grow Dashboard
            </h1>
            <p className="dashboard-subtitle">
              Monitor your cannabis cultivation journey
            </p>
          </div>
          
          <div className="header-actions">
            <Link 
              to="/environment" 
              className="btn btn-outline flex items-center gap-2 py-2 px-4" 
              style={{borderRadius: '8px'}}
            >
              <Activity className="w-5 h-5" />
              Add Environment Data
            </Link>
            <Link 
              to="/plants" 
              className="btn btn-warning flex items-center gap-2 py-2 px-4"
              style={{borderRadius: '8px'}}
            >
              <Plus className="w-5 h-5" />
              Add Plant
            </Link>
          </div>
        </div>
      </header>

      {/* Ultra-Modern Plants Section */}
      <section style={{
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '16px',
        border: '1px solid var(--border)',
        padding: '1.5rem',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        animation: 'fadeInUp 0.8s ease-out 0.2s both'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{
            color: 'var(--text-primary)',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <Sprout className="w-6 h-6" style={{ color: 'var(--primary-color)' }} />
            Your Plants
          </h2>
          <Link 
            to="/plants" 
            style={{
              color: 'var(--primary-color)',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(74, 222, 128, 0.1)';
              e.target.style.borderColor = 'var(--primary-color)';
              e.target.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = 'transparent';
              e.target.style.transform = 'translateX(0)';
            }}
          >
            View All →
          </Link>
        </div>

        <div style={{ width: '100%' }}>
          {plants.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              border: '1px dashed var(--border)'
            }}>
              <div style={{
                background: 'rgba(74, 222, 128, 0.15)',
                padding: '1.5rem',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(74, 222, 128, 0.3)'
              }}>
                <Sprout className="w-10 h-10" style={{ color: 'var(--primary-color)' }} />
              </div>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                No plants yet
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Start your cultivation journey by adding your first plant
              </p>
              <Link 
                to="/plants" 
                className="btn btn-warning flex items-center gap-2 py-2 px-4"
                style={{borderRadius: '8px', display: 'inline-flex'}}
              >
                <Plus className="w-4 h-4" />
                Add Your First Plant
              </Link>
            </div>
          ) : (
            <div className="plant-grid">
              {plants.slice(0, 4).map((plant, index) => {
                const stageConfig = getStageConfig(plant.stage);
                return (
                  <Link
                    key={plant.id}
                    to={`/plants/${plant.id}`}
                    style={{
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      padding: '1.5rem',
                      background: 'var(--surface)',
                      position: 'relative',
                      overflow: 'hidden',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      animation: `slideInUp 0.6s ease-out ${0.8 + index * 0.1}s both`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-4px) scale(1.02)';
                      e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.4)';
                      e.target.style.borderColor = 'var(--primary-color)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.borderColor = 'var(--border)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <h3 style={{ 
                        color: 'var(--primary-color)', 
                        fontWeight: 'bold', 
                        fontSize: '1.25rem',
                        margin: 0
                      }}>
                        {plant.name}
                      </h3>
                      <div style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '100px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        color: '#6ee7b7',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <span>{stageConfig.emoji}</span>
                        {stageConfig.label}
                      </div>
                    </div>
                    
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      {plant.strain || 'Apple Dragon'}
                    </p>
                    
                    {plant.grow_tent && (
                      <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        <Home className="w-4 h-4 mr-2" />
                        {plant.grow_tent}
                      </div>
                    )}
                    
                    <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      <Calendar className="w-4 h-4 mr-2" />
                      {plant.planted_date ? 
                        `Planted ${formatDistanceToNow(new Date(plant.planted_date))} ago` : 
                        'Planted recently'
                      }
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      <Activity className="w-4 h-4 mr-2" />
                      {plant.log_count || 0} activity logs
                    </div>

                    {/* Shimmer effect */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.1), transparent)',
                      animation: 'shimmer 3s ease-in-out infinite',
                      pointerEvents: 'none'
                    }}></div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Environment Summary Section */}
      {environmentData && environmentData.length > 0 && (
        <section style={{
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '16px',
          border: '1px solid var(--border)',
          padding: '1.5rem',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          animation: 'fadeInUp 0.8s ease-out 0.4s both',
          marginTop: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{
              color: 'var(--text-primary)',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Activity className="w-6 h-6" style={{ color: 'var(--primary-color)' }} />
              Environment Overview
            </h2>
            <Link 
              to="/environment" 
              style={{ 
                color: 'var(--primary-color)', 
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              View All →
            </Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {environmentData.length > 0 ? (
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(100, 116, 139, 0.3)',
                borderRadius: '16px',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
              }}>
                <div style={{
                  background: 'rgba(15, 23, 42, 0.9)',
                  borderBottom: '1px solid rgba(100, 116, 139, 0.3)',
                  padding: '1.5rem 1.25rem 1rem 1.25rem'
                }}>
                  <h3 style={{
                    color: '#f8fafc',
                    fontSize: '1rem',
                    fontWeight: '600',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Activity className="w-4 h-4" style={{ color: 'var(--primary-color)' }} />
                    Latest environment measurements and data
                  </h3>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <colgroup>
                      <col style={{ width: '15%' }} />
                      <col style={{ width: '12%' }} />
                      <col style={{ width: '10%' }} />
                      <col style={{ width: '10%' }} />
                      <col style={{ width: '8%' }} />
                      <col style={{ width: '10%' }} />
                      <col style={{ width: '8%' }} />
                      <col style={{ width: '10%' }} />
                      <col style={{ width: '10%' }} />
                      <col style={{ width: '7%' }} />
                    </colgroup>
                    <thead>
                      <tr style={{ 
                        background: 'rgba(15, 23, 42, 0.8)', 
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        borderBottom: '1px solid rgba(100, 116, 139, 0.3)' 
                      }}>
                        <th style={{ 
                          padding: '1rem 1.25rem', 
                          fontWeight: '600', 
                          color: '#e2e8f0',
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          textAlign: 'left'
                        }}>Date/Time</th>
                        <th style={{ 
                          padding: '1rem 1.25rem', 
                          fontWeight: '600', 
                          color: '#e2e8f0',
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          textAlign: 'center'
                        }}>Tent</th>
                        <th style={{ 
                          padding: '1rem 1.25rem', 
                          fontWeight: '600', 
                          color: '#e2e8f0',
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          textAlign: 'center'
                        }}>Stage</th>
                        <th style={{ 
                          padding: '1rem 1.25rem', 
                          fontWeight: '600', 
                          color: '#e2e8f0',
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          textAlign: 'center'
                        }}>Temp</th>
                        <th style={{ 
                          padding: '1rem 1.25rem', 
                          fontWeight: '600', 
                          color: '#e2e8f0',
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          textAlign: 'center'
                        }}>Humidity</th>
                        <th style={{ 
                          padding: '1rem 1.25rem', 
                          fontWeight: '600', 
                          color: '#e2e8f0',
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          textAlign: 'center'
                        }}>pH</th>
                        <th style={{ 
                          padding: '1rem 1.25rem', 
                          fontWeight: '600', 
                          color: '#e2e8f0',
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          textAlign: 'center'
                        }}>Light</th>
                        <th style={{ 
                          padding: '1rem 1.25rem', 
                          fontWeight: '600', 
                          color: '#e2e8f0',
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          textAlign: 'center'
                        }}>CO₂</th>
                        <th style={{ 
                          padding: '1rem 1.25rem', 
                          fontWeight: '600', 
                          color: '#e2e8f0',
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          textAlign: 'center'
                        }}>PPFD</th>
                        <th style={{ 
                          padding: '1rem 1.25rem', 
                          fontWeight: '600', 
                          color: '#e2e8f0',
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          textAlign: 'center'
                        }}>VPD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {environmentData.map((log, index) => (
                        <tr 
                          key={log.id} 
                          style={{ 
                            borderBottom: index < environmentData.length - 1 ? '1px solid rgba(100, 116, 139, 0.2)' : 'none',
                            transition: 'all 0.2s ease',
                            background: index % 2 === 0 ? 'rgba(15, 23, 42, 0.3)' : 'transparent'
                          }} 
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.7)';
                            e.currentTarget.style.backdropFilter = 'blur(8px)';
                            e.currentTarget.style.WebkitBackdropFilter = 'blur(8px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = index % 2 === 0 ? 'rgba(15, 23, 42, 0.3)' : 'transparent';
                            e.currentTarget.style.backdropFilter = 'none';
                            e.currentTarget.style.WebkitBackdropFilter = 'none';
                          }}
                        >
                          <td style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap', textAlign: 'left' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.8rem', gap: '0.125rem' }}>
                              <span style={{ color: '#f8fafc', fontWeight: '600', fontSize: '0.875rem' }}>
                                {format(new Date(log.logged_at), 'MMM dd, yyyy')}
                              </span>
                              <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '500' }}>
                                {format(new Date(log.logged_at), 'HH:mm:ss')}
                              </span>
                            </div>
                          </td>
                          <td style={{ 
                            padding: '1rem 1.25rem', 
                            whiteSpace: 'nowrap', 
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}>
                            <span style={{ 
                              color: '#f8fafc',
                              background: 'rgba(100, 116, 139, 0.2)',
                              backdropFilter: 'blur(8px)',
                              WebkitBackdropFilter: 'blur(8px)',
                              padding: '0.375rem 0.75rem',
                              borderRadius: '8px',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              border: '1px solid rgba(100, 116, 139, 0.3)',
                              display: 'inline-block'
                            }}>
                              {log.grow_tent || 'General'}
                            </span>
                          </td>
                          <td style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '100px',
                              fontSize: '0.625rem',
                              fontWeight: '700',
                              background: getStageColor(log.stage).bg,
                              color: getStageColor(log.stage).color,
                              border: `1px solid ${getStageColor(log.stage).border}`,
                              gap: '0.2rem',
                              backdropFilter: 'blur(8px)',
                              WebkitBackdropFilter: 'blur(8px)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.015em',
                              whiteSpace: 'nowrap',
                              maxWidth: '100%',
                              overflow: 'hidden',
                              textAlign: 'center',
                              minWidth: 'fit-content'
                            }}>
                              <Sprout className="w-2 h-2" />
                              {log.stage || 'N/A'}
                            </span>
                          </td>
                          <td style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
                            <span style={{ 
                              color: log.temperature ? '#f87171' : '#64748b', 
                              fontWeight: '600',
                              fontSize: '0.875rem'
                            }}>
                              {log.temperature ? `${log.temperature}°F` : '-'}
                            </span>
                          </td>
                          <td style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
                            <span style={{ 
                              color: log.humidity ? '#60a5fa' : '#64748b', 
                              fontWeight: '600',
                              fontSize: '0.875rem'
                            }}>
                              {log.humidity ? `${log.humidity}%` : '-'}
                            </span>
                          </td>
                          <td style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
                            <span style={{ 
                              color: log.ph_level ? '#bef264' : '#64748b', 
                              fontWeight: '600',
                              fontSize: '0.875rem'
                            }}>
                              {log.ph_level ?? '-'}
                            </span>
                          </td>
                          <td style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
                            <span style={{ 
                              color: log.light_hours ? '#fbbf24' : '#64748b', 
                              fontWeight: '600',
                              fontSize: '0.875rem'
                            }}>
                              {log.light_hours ? `${log.light_hours}h` : '-'}
                            </span>
                          </td>
                          <td style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
                            <span style={{ 
                              color: log.co2_ppm ? '#fbbf24' : '#64748b', 
                              fontWeight: '600',
                              fontSize: '0.875rem'
                            }}>
                              {log.co2_ppm ? `${log.co2_ppm}ppm` : '-'}
                            </span>
                          </td>
                          <td style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
                            <span style={{ 
                              color: log.ppfd ? '#a78bfa' : '#64748b', 
                              fontWeight: '600',
                              fontSize: '0.875rem'
                            }}>
                              {log.ppfd ? `${log.ppfd}μmol` : '-'}
                            </span>
                          </td>
                          <td style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
                            <span style={{ 
                              color: log.vpd ? '#22d3ee' : '#64748b', 
                              fontWeight: '600',
                              fontSize: '0.875rem'
                            }}>
                              {log.vpd ? `${log.vpd}kPa` : '-'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(100, 116, 139, 0.3)',
                borderRadius: '16px',
                padding: '3rem',
                textAlign: 'center',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
              }}>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>
                  No environment data available
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;