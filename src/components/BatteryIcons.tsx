interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

// Physical Battery - Energy/Lightning bolt in circle
export const PhysicalIcon = ({ size = 32, color = "#64748B", style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="32" cy="32" r="28" stroke={color} strokeWidth="3" fill={`${color}15`}/>
    <path d="M35 18L24 34H32L29 46L40 30H32L35 18Z" fill={color}/>
  </svg>
);

// Mental Battery - Brain with connections
export const MentalIcon = ({ size = 32, color = "#60A5FA", style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M32 14C22 14 18 20 18 28C18 32 20 36 22 38C20 40 18 42 18 46C18 50 22 54 28 54H36C42 54 46 50 46 46C46 42 44 40 42 38C44 36 46 32 46 28C46 20 42 14 32 14Z" 
          stroke={color} strokeWidth="3" fill={`${color}15`}/>
    <circle cx="26" cy="28" r="2" fill={color}/>
    <circle cx="32" cy="26" r="2" fill={color}/>
    <circle cx="38" cy="28" r="2" fill={color}/>
    <line x1="26" y1="32" x2="30" y2="36" stroke={color} strokeWidth="2"/>
    <line x1="38" y1="32" x2="34" y2="36" stroke={color} strokeWidth="2"/>
    <line x1="32" y1="30" x2="32" y2="36" stroke={color} strokeWidth="2"/>
  </svg>
);

// Emotional Battery - Heart with pulse
export const EmotionalIcon = ({ size = 32, color = "#818CF8", style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M32 52C32 52 12 38 12 24C12 16 18 12 24 12C28 12 30 14 32 16C34 14 36 12 40 12C46 12 52 16 52 24C52 38 32 52 32 52Z" 
          stroke={color} strokeWidth="3" fill={`${color}15`}/>
    <path d="M18 28L24 28L27 22L30 34L33 28L38 28" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Identity Battery - Person with mirror/reflection
export const IdentityIcon = ({ size = 32, color = "#94A3B8", style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="32" cy="22" r="8" stroke={color} strokeWidth="3" fill={`${color}15`}/>
    <path d="M20 38C20 32 25 28 32 28C39 28 44 32 44 38V50H20V38Z" stroke={color} strokeWidth="3" fill={`${color}15`}/>
    <path d="M26 40L32 46L38 40" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="28" cy="22" r="1.5" fill={color}/>
    <circle cx="36" cy="22" r="1.5" fill={color}/>
  </svg>
);

// Relational Battery - People connected
export const RelationalIcon = ({ size = 32, color = "#A78BFA", style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="24" cy="20" r="6" stroke={color} strokeWidth="2.5" fill={`${color}15`}/>
    <circle cx="40" cy="20" r="6" stroke={color} strokeWidth="2.5" fill={`${color}15`}/>
    <path d="M14 38C14 33 18 30 24 30C26 30 28 30.5 29 31.5" stroke={color} strokeWidth="2.5" fill="none"/>
    <path d="M50 38C50 33 46 30 40 30C38 30 36 30.5 35 31.5" stroke={color} strokeWidth="2.5" fill="none"/>
    <path d="M14 38V48H34V48H50V38" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="29" y1="38" x2="35" y2="38" stroke={color} strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

// Professional Battery - Briefcase with star/excellence
export const ProfessionalIcon = ({ size = 32, color = "#38BDF8", style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="14" y="26" width="36" height="24" rx="2" stroke={color} strokeWidth="3" fill={`${color}15`}/>
    <path d="M24 26V20C24 18 25 16 28 16H36C39 16 40 18 40 20V26" stroke={color} strokeWidth="3" fill="none"/>
    <rect x="30" y="32" width="4" height="8" fill={color}/>
    <path d="M32 38L28 42L30 42L29 46L36 40L34 40L35 38L32 38Z" fill={color}/>
  </svg>
);

// Spiritual Battery - Lotus/meditation with light rays
export const SpiritualIcon = ({ size = 32, color = "#93C5FD", style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="32" cy="32" r="20" stroke={color} strokeWidth="3" fill={`${color}15`}/>
    <circle cx="32" cy="32" r="6" fill={color}/>
    <line x1="32" y1="12" x2="32" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="32" y1="46" x2="32" y2="52" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="12" y1="32" x2="18" y2="32" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="46" y1="32" x2="52" y2="32" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="19" y1="19" x2="23" y2="23" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="41" y1="41" x2="45" y2="45" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="45" y1="19" x2="41" y2="23" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="23" y1="41" x2="19" y2="45" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

// Export component that renders the right icon based on type
export const BatteryIcon = ({ type, size = 32, color, style }: { type: string } & IconProps) => {
  const icons: Record<string, React.ComponentType<IconProps>> = {
    physical: PhysicalIcon,
    mental: MentalIcon,
    emotional: EmotionalIcon,
    identity: IdentityIcon,
    relational: RelationalIcon,
    professional: ProfessionalIcon,
    spiritual: SpiritualIcon,
  };

  const IconComponent = icons[type] || PhysicalIcon;
  return <IconComponent size={size} color={color} style={style} />;
};

