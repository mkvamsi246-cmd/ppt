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
      className={`h-screen w-full flex flex-col justify-center items-center overflow-hidden relative px-3 py-2 md:px-8 select-none bg-[#f8fafc] ${className}`}
      style={{ height: '100dvh' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-7xl mx-auto flex flex-col justify-between h-full overflow-y-auto sm:overflow-hidden overscroll-contain pb-16 sm:pb-0 hide-scrollbar"
        style={{ maxHeight: 'calc(100dvh - 1rem)' }}
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
    <div className="text-center mb-2 md:mb-3 px-4 flex-shrink-0">
      <div className="mb-1">
        <span
          className="font-mono text-xs md:text-sm font-black tracking-widest uppercase px-3 py-0.5 rounded-full bg-sky-50 border border-sky-200"
          style={{ color }}
        >
          {number}
        </span>
      </div>
      <h2
        className="font-display font-black tracking-tight text-slate-900"
        style={{
          fontSize: 'clamp(1.1rem, 2.7vw, 2.25rem)',
          marginBottom: subtitle ? 4 : 0,
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-slate-700 font-medium mx-auto leading-normal"
          style={{ fontSize: 'clamp(0.72rem, 1.15vw, 1.05rem)', maxWidth: 880 }}
        >
          {subtitle}
        </p>
      )}
      <div
        style={{
          height: 3,
          width: 70,
          margin: '6px auto 0',
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
