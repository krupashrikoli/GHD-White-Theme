/**
 * Single source of truth for bookable rates (₹ per room per night, before tax).
 * RoomCard / checkout must use these values so displayed totals always match.
 */
export type RoomCategoryId = "studio-apartment";

export type RoomCategory = {
  id: RoomCategoryId;
  label: string;
  /** Short hint shown under room title. */
  shortDescription: string;
  /** Base rate per room per night (before meals, before tax). */
  roomOnly: { original: number; discounted: number };
};

export const ROOM_CATEGORIES: Record<RoomCategoryId, RoomCategory> = {
  "studio-apartment": {
    id: "studio-apartment",
    label: "Royal Studio",
    shortDescription: "Modern smart comfort — ideal for 2 guests.",
    roomOnly: { original: 7500, discounted: 5999 },
  },
} as const;

/** ₹ per selected meal, per adult, per night */
export const MEAL_PRICE_PER_ADULT = 500;
/** ₹ per selected meal, per child, per night */
export const MEAL_PRICE_PER_CHILD = 250;

export const BOOKING_TAX_RATE = 0.18;

/** Demo coupon codes — replace with API validation when backend is ready. */
export function parseBookingCoupon(
  raw: string,
  taxableSubtotalInr: number,
):
  | { ok: true; code: string; discountInr: number; summary: string }
  | { ok: false; error: string } {
  const code = raw.trim().toUpperCase();
  if (!code) {
    return { ok: false, error: "Enter a coupon code." };
  }
  if (taxableSubtotalInr <= 0) {
    return { ok: false, error: "No chargeable subtotal to discount." };
  }

  switch (code) {
    case "SAVE10":
    case "GHDSAVE10": {
      const discountInr =
        Math.round(taxableSubtotalInr * 0.1 * 100) / 100;
      return {
        ok: true,
        code,
        discountInr,
        summary: "10% off room subtotal (before tax).",
      };
    }
    case "WELCOME500": {
      const discountInr = Math.min(500, taxableSubtotalInr);
      return {
        ok: true,
        code,
        discountInr,
        summary: "₹500 off your stay (before tax).",
      };
    }
    default:
      return {
        ok: false,
        error: "This coupon code is not valid or has expired.",
      };
  }
}

export type MealSelection = {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
};

export type BookingRateSelection = {
  rooms: Array<{
    categoryId: RoomCategoryId;
    categoryLabel: string;
    quantity: number;
    /** Base ₹ per room per night (discounted room rate, before meal add-ons) */
    baseRatePerNight: number;
  }>;
  meals: MealSelection;
};

export function countSelectedMeals(m: MealSelection): number {
  return (
    (m.breakfast ? 1 : 0) + (m.lunch ? 1 : 0) + (m.dinner ? 1 : 0)
  );
}

export function perGuestMealsPerNightTotal(args: {
  adults: number;
  children: number;
  meals: MealSelection;
}): number {
  const meals = countSelectedMeals(args.meals);
  const perMeal = args.adults * MEAL_PRICE_PER_ADULT + args.children * MEAL_PRICE_PER_CHILD;
  return meals * perMeal;
}
