import type {
  BookingRateSelection,
  MealSelection,
  RoomCategoryId,
} from "./bookingRates";
import { defaultRoomOccupancy, type RoomOccupancy } from "./roomOccupancy";

export const BOOKING_CHECKOUT_SESSION_KEY = "ghd_booking_checkout_v1";

export type PersistedBookingSearch = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: RoomOccupancy[];
};

export type CheckoutFormDraft = {
  firstName: string;
  surname: string;
  phone: string;
  email: string;
  country: string;
  address1: string;
  address2: string;
  city: string;
  stateProvince: string;
  createAccount: boolean;
  cardNumber: string;
  cardExp: string;
  cardCvv: string;
  nameOnCard: string;
  agreePrivacy: boolean;
  couponInput: string;
  appliedCouponCode: string | null;
};

export type PersistedBookingCheckoutV1 = {
  v: 1;
  /** When true, returning to /booking should reopen the checkout dialog. */
  modalOpen: boolean;
  form: CheckoutFormDraft;
  selection: BookingRateSelection | null;
  search: PersistedBookingSearch;
  meals: MealSelection;
  roomAssignments: RoomCategoryId[];
  selectedHotelId: string;
};

export function defaultCheckoutFormDraft(): CheckoutFormDraft {
  return {
    firstName: "",
    surname: "",
    phone: "",
    email: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    stateProvince: "",
    createAccount: false,
    cardNumber: "",
    cardExp: "",
    cardCvv: "",
    nameOnCard: "",
    agreePrivacy: false,
    couponInput: "",
    appliedCouponCode: null,
  };
}

function defaultSearch(): PersistedBookingSearch {
  return {
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    rooms: [defaultRoomOccupancy()],
  };
}

function defaultMeals(): MealSelection {
  return { breakfast: true, lunch: false, dinner: false };
}

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

function parsePersisted(raw: unknown): PersistedBookingCheckoutV1 | null {
  if (!isRecord(raw) || raw.v !== 1) return null;
  if (typeof raw.modalOpen !== "boolean") return null;
  if (!isRecord(raw.form)) return null;
  if (!isRecord(raw.search)) return null;
  if (!isRecord(raw.meals)) return null;
  if (!Array.isArray(raw.roomAssignments)) return null;
  if (typeof raw.selectedHotelId !== "string") return null;

  const selection =
    raw.selection === null
      ? null
      : isRecord(raw.selection) && Array.isArray(raw.selection.rooms)
        ? (raw.selection as unknown as BookingRateSelection)
        : null;

  const f = raw.form;
  const form: CheckoutFormDraft = {
    firstName: typeof f.firstName === "string" ? f.firstName : "",
    surname: typeof f.surname === "string" ? f.surname : "",
    phone: typeof f.phone === "string" ? f.phone : "",
    email: typeof f.email === "string" ? f.email : "",
    country: typeof f.country === "string" ? f.country : "",
    address1: typeof f.address1 === "string" ? f.address1 : "",
    address2: typeof f.address2 === "string" ? f.address2 : "",
    city: typeof f.city === "string" ? f.city : "",
    stateProvince: typeof f.stateProvince === "string" ? f.stateProvince : "",
    createAccount: Boolean(f.createAccount),
    cardNumber: typeof f.cardNumber === "string" ? f.cardNumber : "",
    cardExp: typeof f.cardExp === "string" ? f.cardExp : "",
    cardCvv: typeof f.cardCvv === "string" ? f.cardCvv : "",
    nameOnCard: typeof f.nameOnCard === "string" ? f.nameOnCard : "",
    agreePrivacy: Boolean(f.agreePrivacy),
    couponInput: typeof f.couponInput === "string" ? f.couponInput : "",
    appliedCouponCode:
      typeof f.appliedCouponCode === "string"
        ? f.appliedCouponCode
        : f.appliedCouponCode === null
          ? null
          : null,
  };

  const s = raw.search;
  const rooms = Array.isArray(s.rooms)
    ? (s.rooms as RoomOccupancy[])
    : [defaultRoomOccupancy()];

  const search: PersistedBookingSearch = {
    checkIn: typeof s.checkIn === "string" ? s.checkIn : "",
    checkOut: typeof s.checkOut === "string" ? s.checkOut : "",
    adults: typeof s.adults === "number" ? s.adults : 2,
    children: typeof s.children === "number" ? s.children : 0,
    rooms,
  };

  const m = raw.meals;
  const meals: MealSelection = {
    breakfast: Boolean(m.breakfast),
    lunch: Boolean(m.lunch),
    dinner: Boolean(m.dinner),
  };

  const roomAssignments = raw.roomAssignments.filter(
    (x): x is RoomCategoryId => x === "studio-apartment",
  ) as RoomCategoryId[];

  return {
    v: 1,
    modalOpen: raw.modalOpen,
    form,
    selection,
    search,
    meals,
    roomAssignments:
      roomAssignments.length > 0 ? roomAssignments : ["studio-apartment"],
    selectedHotelId: raw.selectedHotelId,
  };
}

export function loadPersistedCheckout(): PersistedBookingCheckoutV1 | null {
  try {
    const raw = sessionStorage.getItem(BOOKING_CHECKOUT_SESSION_KEY);
    if (!raw) return null;
    return parsePersisted(JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
}

export function mergePersistedCheckout(
  patch: Partial<
    Omit<PersistedBookingCheckoutV1, "v" | "form"> & {
      form?: Partial<CheckoutFormDraft>;
    }
  >,
): void {
  try {
    const cur = loadPersistedCheckout();
    const formBase = cur?.form ?? defaultCheckoutFormDraft();
    const form: CheckoutFormDraft = patch.form
      ? { ...formBase, ...patch.form }
      : formBase;

    const next: PersistedBookingCheckoutV1 = {
      v: 1,
      modalOpen:
        patch.modalOpen !== undefined ? patch.modalOpen : (cur?.modalOpen ?? false),
      form,
      selection:
        patch.selection !== undefined ? patch.selection : (cur?.selection ?? null),
      search: patch.search ?? cur?.search ?? defaultSearch(),
      meals: patch.meals ?? cur?.meals ?? defaultMeals(),
      roomAssignments:
        patch.roomAssignments ?? cur?.roomAssignments ?? ["studio-apartment"],
      selectedHotelId:
        patch.selectedHotelId ?? cur?.selectedHotelId ?? "nivaara-nerul",
    };
    sessionStorage.setItem(BOOKING_CHECKOUT_SESSION_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearPersistedCheckout(): void {
  try {
    sessionStorage.removeItem(BOOKING_CHECKOUT_SESSION_KEY);
  } catch {
    /* ignore */
  }
}

/** True if guest may resume checkout (e.g. show link from Policies). */
export function hasResumableCheckoutModal(): boolean {
  const p = loadPersistedCheckout();
  return Boolean(p?.modalOpen && p.selection);
}
