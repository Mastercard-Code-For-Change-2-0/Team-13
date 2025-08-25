/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
				serif: ['Playfair Display', 'Merriweather', 'Georgia', 'serif'],
			},
			fontSize: {
				'hero': 'var(--font-size-hero)',
				'xl': 'var(--font-size-xl)',
			},
			letterSpacing: {
				'tight': 'var(--letter-spacing-tight)',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					glow: 'hsl(var(--secondary-glow))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Luxury color palette
				luxury: {
					50: 'hsl(210, 40%, 98%)',
					100: 'hsl(210, 40%, 96%)',
					200: 'hsl(214, 32%, 91%)',
					300: 'hsl(213, 27%, 84%)',
					400: 'hsl(215, 20%, 65%)',
					500: 'hsl(215, 16%, 47%)',
					600: 'hsl(215, 19%, 35%)',
					700: 'hsl(215, 25%, 27%)',
					800: 'hsl(217, 33%, 17%)',
					900: 'hsl(222, 47%, 11%)',
					950: 'hsl(229, 84%, 5%)',
				},
				// Cobalt blue palette (based on hsl(215, 100%, 34%))
				cobalt: {
					50: 'hsl(215, 100%, 97%)',
					100: 'hsl(215, 100%, 94%)',
					200: 'hsl(215, 100%, 89%)',
					300: 'hsl(215, 100%, 82%)',
					400: 'hsl(215, 100%, 72%)',
					500: 'hsl(215, 100%, 34%)', // Primary cobalt blue
					600: 'hsl(215, 100%, 45%)',
					700: 'hsl(215, 100%, 28%)',
					800: 'hsl(215, 100%, 22%)',
					900: 'hsl(215, 100%, 18%)',
					950: 'hsl(215, 100%, 12%)',
				},
				// Subtle yellow palette (based on #FFD900)
				yellow: {
					50: 'hsl(51, 100%, 97%)',
					100: 'hsl(51, 100%, 94%)',
					200: 'hsl(51, 100%, 89%)',
					300: 'hsl(51, 100%, 82%)',
					400: 'hsl(51, 100%, 72%)',
					500: 'hsl(51, 100%, 50%)', // #FFD900
					600: 'hsl(51, 100%, 45%)',
					700: 'hsl(51, 100%, 35%)',
					800: 'hsl(51, 100%, 30%)',
					900: 'hsl(51, 100%, 25%)',
					950: 'hsl(51, 100%, 20%)',
				},
				// Dark blue palette (based on #091235)
				navy: {
					50: 'hsl(230, 100%, 98%)',
					100: 'hsl(230, 100%, 96%)',
					200: 'hsl(230, 100%, 92%)',
					300: 'hsl(230, 100%, 85%)',
					400: 'hsl(230, 100%, 75%)',
					500: 'hsl(230, 100%, 60%)',
					600: 'hsl(230, 100%, 50%)',
					700: 'hsl(230, 100%, 40%)',
					800: 'hsl(230, 100%, 30%)',
					900: 'hsl(230, 100%, 20%)',
					950: 'hsl(230, 100%, 10%)', // #091235
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-glass': 'var(--gradient-glass)',
				'gradient-luxury': 'var(--gradient-luxury)',
				'gradient-button': 'var(--gradient-button)',
				'gradient-button-hover': 'var(--gradient-button-hover)',
			},
			boxShadow: {
				'elegant': 'var(--shadow-elegant)',
				'glow': 'var(--shadow-glow)',
				'soft': 'var(--shadow-soft)',
				'glass': 'var(--shadow-glass)',
				'luxury': 'var(--shadow-luxury)',
				'button-glow': 'var(--shadow-button-glow)',
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px hsl(var(--primary-glow) / 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px hsl(var(--primary-glow) / 0.6)'
					}
				},
				'button-glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px hsl(215, 100%, 34% / 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px hsl(215, 100%, 34% / 0.6)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-up': 'fade-up 0.8s ease-out forwards',
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'button-glow': 'button-glow 2s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
