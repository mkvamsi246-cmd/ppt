import { motion } from 'framer-motion';
import React from 'react';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export function SectionWrapper({ id, children, className = '', dark: _dark = false }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`min-h-[100dvh] sm:h-screen w-full flex flex-col justify-start sm:justify-center items-center relative px-2.5 sm:px-6 md:px-8 select-none bg-[#f8fafc] overflow-y-auto sm:overflow-hidden ${className}`}
      style={{ height: '100dvh' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-7xl mx-auto flex flex-col justify-start sm:justify-between h-full min-h-0 overflow-y-auto sm:overflow-hidden overscroll-contain pt-3 sm:pt-4 pb-24 sm:pb-20 hide-scrollbar"
      >
        {children}
      </motion.div>
    </section>
  );
}

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  color?: string;
}

export function SectionHeader({ number, title, subtitle, color = '#0284c7' }: SectionHeaderProps) {
  return (
    <div className="text-center mb-1.5 sm:mb-2 md:mb-3 px-2 sm:px-4 flex-shrink-0">
      <div className="mb-0.5 sm:mb-1">
        <span
          className="font-mono text-[10px] sm:text-xs md:text-sm font-black tracking-wider uppercase px-2.5 sm:px-3 py-0.5 rounded-full bg-sky-50 border border-sky-200 inline-block"
          style={{ color }}
        >
          {number}
        </span>
      </div>
      <h2
        className="font-display font-black tracking-tight text-slate-900 leading-tight"
        style={{
          fontSize: 'clamp(1.05rem, 2.4vw, 2.15rem)',
          marginBottom: subtitle ? 2 : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-slate-600 font-medium mx-auto leading-snug sm:leading-normal text-xs sm:text-sm max-w-3xl"
        >
          {subtitle}
        </p>
      )}
      <div
        style={{
          height: 3,
          width: 50,
          margin: '4px auto 0',
          borderRadius: 2,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
    </div>
  );
}

export function GlassCard({ children, className = '', style = {} }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`glass rounded-2xl ${className}`}
      style={{
        padding: '16px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function ChipLabel({ label, type = 'prototype' }: {
  label: string;
  type?: 'prototype' | 'proposed' | 'simulation' | 'emergency';
}) {
  const styles = {
    prototype:  { bg: '#dbeafe', color: '#1e40af', border: '#93c5fd', text: 'WORKING PROTOTYPE' },
    proposed:   { bg: '#fef3c7', color: '#92400e', border: '#fde68a', text: 'PROPOSED ARCHITECTURE' },
    simulation: { bg: '#e0e7ff', color: '#3730a3', border: '#c7d2fe', text: 'LIVE SIMULATION' },
    emergency:  { bg: '#fee2e2', color: '#991b1b', border: '#fca5a5', text: 'CRITICAL EMERGENCY' },
  }[type];

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-xs"
      style={{
        background: styles.bg,
        color: styles.color,
        border: `1px solid ${styles.border}`,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: styles.color }} />
      {label || styles.text}
    </span>
  );
}
