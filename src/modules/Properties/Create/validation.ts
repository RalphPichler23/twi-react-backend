// src/modules/Properties/Create/validation.ts
import { z } from 'zod';

export const propertyCreateSchema = z.object({
  title: z.string().min(1, 'Titel ist erforderlich'),
  address: z.string().min(1, 'Adresse ist erforderlich'),
  city: z.string().min(1, 'Stadt ist erforderlich'),
  district: z.string()
    .length(4, 'Postleitzahl muss 4 Ziffern haben')
    .regex(/^\d{4}$/, 'Postleitzahl muss aus Zahlen bestehen'),
  price: z.number()
    .min(1, 'Preis muss größer als 0 sein'),
  area: z.number()
    .min(1, 'Fläche muss größer als 0 sein'),
  rooms: z.number().min(0),
  bathrooms: z.number().min(0),
  type: z.enum(['house', 'apartment', 'commercial', 'land']),
  status: z.enum(['available', 'reserved', 'sold']),
  description: z.string()
    .min(20, 'Beschreibung muss mindestens 20 Zeichen lang sein'),
  features: z.array(z.string())
    .min(1, 'Mindestens ein Feature ist erforderlich'),
  images: z.array(z.instanceof(File)),
}).refine((data) => {
  // Rooms and bathrooms are required for house and apartment
  if (data.type === 'house' || data.type === 'apartment') {
    return data.rooms >= 1 && data.bathrooms >= 1;
  }
  return true;
}, {
  message: 'Zimmer und Badezimmer sind für Häuser und Wohnungen erforderlich',
  path: ['rooms'], // This will show error on rooms field
});

export type PropertyCreateValidation = z.infer<typeof propertyCreateSchema>;

// Validation by step
export const stepValidations = {
  basic: z.object({
    title: z.string().min(1, 'Titel ist erforderlich'),
    address: z.string().min(1, 'Adresse ist erforderlich'),
    city: z.string().min(1, 'Stadt ist erforderlich'),
    district: z.string()
      .length(4, 'Postleitzahl muss 4 Ziffern haben')
      .regex(/^\d{4}$/, 'Postleitzahl muss aus Zahlen bestehen'),
  }),
  
  details: z.object({
    price: z.number().min(1, 'Preis muss größer als 0 sein'),
    area: z.number().min(1, 'Fläche muss größer als 0 sein'),
    rooms: z.number().min(0),
    bathrooms: z.number().min(0),
    type: z.enum(['house', 'apartment', 'commercial', 'land']),
    status: z.enum(['available', 'reserved', 'sold']),
  }).refine((data) => {
    if (data.type === 'house' || data.type === 'apartment') {
      return data.rooms >= 1 && data.bathrooms >= 1;
    }
    return true;
  }, {
    message: 'Zimmer und Badezimmer müssen mindestens 1 sein für Häuser und Wohnungen',
    path: ['rooms'],
  }),
  
  images: z.object({
    images: z.array(z.instanceof(File)),
  }),
  
  features: z.object({
    description: z.string().min(20, 'Beschreibung muss mindestens 20 Zeichen lang sein'),
    features: z.array(z.string()).min(1, 'Mindestens ein Feature ist erforderlich'),
  }),
};