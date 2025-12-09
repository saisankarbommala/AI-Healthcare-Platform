import { useEffect, useMemo, useRef, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Building2,
  User,
  Map,
  ShieldCheck,
  Search,
  Filter,
  Crosshair,
  Flag,
  Activity,
} from "lucide-react";
import { FeaturePage } from "../../components/FeaturePage";

/* ============ helpers ============ */

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function haversineKm(a, b) {
  const R = 6371; // km
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return 2 * R * Math.asin(Math.sqrt(h));
}

function uid() {
  return Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
}

function hashToPct(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % 100;
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/* ============ tiny UI building blocks ============ */

function Modal({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-3xl rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl">
        <div className="flex items-center justify-between gap-3 p-5 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Close
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 2300);
    return () => clearTimeout(t);
  }, [message, onDone]);

  if (!message) return null;
  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div className="rounded-2xl bg-emerald-600 text-white px-5 py-3 shadow-lg">
        {message}
      </div>
    </div>
  );
}

/* ============ MAIN PAGE ============ */

export function Appointments() {
  // ---- 1) 20+ nearby places (hospitals/clinics/labs/pharmacies) ----
  // NOTE: Replace image paths with your real AI images (recommended).
  // If you don't add images yet, the UI still works (it will render a clean fallback).
  const places = useMemo(
    () => [
      // Hospitals (6)
      {
        id: "h1",
        type: "Hospital",
        name: "Apollo Medical Center",
        address: "Near City Square, Main Road",
        lat: 17.4346,
        lng: 78.4564,
        image: "/src/assets/places/hospital-1.jpg",
        doctors: [
          { name: "Dr. Sarah Johnson", specialty: "General Physician", slots: ["10:00 AM", "11:30 AM", "04:00 PM"] },
          { name: "Dr. Amit Rao", specialty: "Dermatology", slots: ["12:30 PM", "03:00 PM", "05:30 PM"] },
        ],
      },
      {
        id: "h2",
        type: "Hospital",
        name: "City Heart Clinic (Hospital Wing)",
        address: "Cardio Street, Sector 7",
        lat: 17.4221,
        lng: 78.4790,
        image: "/src/assets/places/hospital-2.jpg",
        doctors: [
          { name: "Dr. Rajesh Kumar", specialty: "Cardiology", slots: ["09:30 AM", "12:00 PM", "02:30 PM"] },
          { name: "Dr. Michael Chen", specialty: "Cardiology", slots: ["03:00 PM", "05:00 PM", "06:30 PM"] },
        ],
      },
      {
        id: "h3",
        type: "Hospital",
        name: "Sunrise Multispeciality Hospital",
        address: "Sunrise Ave, Near Park",
        lat: 17.4500,
        lng: 78.4805,
        image: "/src/assets/places/hospital-3.jpg",
        doctors: [
          { name: "Dr. Jennifer Lee", specialty: "Neurology", slots: ["11:00 AM", "01:00 PM", "05:00 PM"] },
          { name: "Dr. Hrithik Sharma", specialty: "Orthopedics", slots: ["02:00 PM", "04:30 PM", "07:00 PM"] },
        ],
      },
      
      // Clinics (5)
      {
        id: "c1",
        type: "Clinic",
        name: "Wellness Family Clinic",
        address: "Green Park Lane",
        lat: 17.4412,
        lng: 78.4622,
        image: "/src/assets/places/clinic-1.jpg",
        doctors: [
          { name: "Dr. Neha Verma", specialty: "Family Medicine", slots: ["10:00 AM", "01:00 PM", "06:00 PM"] },
          { name: "Dr. Kunal Das", specialty: "Nutrition", slots: ["11:30 AM", "02:30 PM", "05:30 PM"] },
        ],
      },
      {
        id: "c2",
        type: "Clinic",
        name: "Prime Pediatric Care",
        address: "Children's Lane, Phase 2",
        lat: 17.4288,
        lng: 78.4688,
        image: "/src/assets/places/clinic-2.jpg",
        doctors: [
          { name: "Dr. Ananya Singh", specialty: "Pediatrics", slots: ["09:00 AM", "11:00 AM", "04:00 PM"] },
          { name: "Dr. Vivek Nair", specialty: "Pediatrics", slots: ["01:30 PM", "03:30 PM", "06:00 PM"] },
        ],
      },
      {
        id: "c3",
        type: "Clinic",
        name: "Smile Dental Studio",
        address: "Dental Street, Near Metro",
        lat: 17.4375,
        lng: 78.4759,
        image: "/src/assets/places/clinic-3.jpg",
        doctors: [
          { name: "Dr. Priya Menon", specialty: "Dentistry", slots: ["10:30 AM", "12:30 PM", "05:00 PM"] },
          { name: "Dr. Arjun Patel", specialty: "Orthodontics", slots: ["11:00 AM", "02:00 PM", "06:30 PM"] },
        ],
      },
     

      // Labs (5)
      {
        id: "l1",
        type: "Lab",
        name: "LifeLab Diagnostics",
        address: "Diagnostic Hub, Block A",
        lat: 17.4305,
        lng: 78.4598,
        image: "/src/assets/places/lab-1.jpg",
        services: [
          { name: "CBC (Full Blood Count)", slots: ["09:00 AM", "11:00 AM", "02:00 PM"] },
          { name: "Thyroid Panel", slots: ["10:30 AM", "01:30 PM", "04:30 PM"] },
        ],
      },
      {
        id: "l2",
        type: "Lab",
        name: "CarePoint Pathology",
        address: "Health Plaza, Tower B",
        lat: 17.4480,
        lng: 78.4712,
        image: "/src/assets/places/lab-2.jpg",
        services: [
          { name: "HbA1c (Diabetes)", slots: ["09:30 AM", "12:00 PM", "05:00 PM"] },
          { name: "Lipid Profile", slots: ["10:00 AM", "01:00 PM", "06:00 PM"] },
        ],
      },
      {
        id: "l3",
        type: "Lab",
        name: "Prime Imaging & Lab",
        address: "Radiology Lane",
        lat: 17.4199,
        lng: 78.4827,
        image: "/src/assets/places/lab-3.jpg",
        services: [
          { name: "X-Ray (Chest/Joint)", slots: ["10:00 AM", "12:15 PM", "03:45 PM"] },
          { name: "Ultrasound (Abdomen)", slots: ["09:30 AM", "01:30 PM", "05:15 PM"] },
        ],
      },
      {
        id: "l4",
        type: "Lab",
        name: "Advance Bio Lab",
        address: "Bio Park, Gate 3",
        lat: 17.4398,
        lng: 78.4499,
        image: "/src/assets/places/lab-1.jpg",
        services: [{ name: "Hormone Profile", slots: ["10:00 AM", "01:00 PM", "04:00 PM"] }],
      },
      {
        id: "l5",
        type: "Lab",
        name: "QuickCheck Diagnostics",
        address: "Market Road, Shop 9",
        lat: 17.4232,
        lng: 78.4608,
        image: "/src/assets/places/lab-2.jpg",
        services: [{ name: "Kidney Function Test", slots: ["09:30 AM", "12:30 PM", "03:30 PM"] }],
      },

      // Pharmacies (4)
      {
        id: "p1",
        type: "Pharmacy",
        name: "CityCare Pharmacy",
        address: "Market Street, Shop 12",
        lat: 17.4360,
        lng: 78.4526,
        image: "/src/assets/places/pharmacy-1.jpg",
        services: [
          { name: "Prescription Pick-up", slots: ["10:00 AM", "01:00 PM", "05:00 PM"] },
          { name: "Same-day Delivery", slots: ["11:30 AM", "02:30 PM", "06:30 PM"] },
        ],
      },
      {
        id: "p2",
        type: "Pharmacy",
        name: "WellNest Pharmacy",
        address: "Central Avenue, Shop 5",
        lat: 17.4456,
        lng: 78.4655,
        image: "/src/assets/places/pharmacy-2.jpg",
        services: [
          { name: "Prescription Fill", slots: ["09:30 AM", "12:30 PM", "04:30 PM"] },
          { name: "Monthly Pack (Chronic)", slots: ["11:00 AM", "02:00 PM", "05:30 PM"] },
        ],
      },
      {
        id: "p3",
        type: "Pharmacy",
        name: "MediQuick Pharmacy",
        address: "Tech Park Road",
        lat: 17.4523,
        lng: 78.4768,
        image: "/src/assets/places/pharmacy-3.jpg",
        services: [
          { name: "OTC & First Aid", slots: ["10:15 AM", "01:15 PM", "03:45 PM"] },
          { name: "Cold/Flu Combo", slots: ["09:45 AM", "12:45 PM", "06:15 PM"] },
        ],
      },
      {
        id: "p4",
        type: "Pharmacy",
        name: "HealPoint Pharmacy",
        address: "Hospital Road, Shop 1",
        lat: 17.4216,
        lng: 78.4460,
        image: "/src/assets/places/pharmacy-1.jpg",
        services: [{ name: "Fast Pickup Slot", slots: ["10:00 AM", "01:00 PM", "04:00 PM"] }],
      },
    ],
    []
  );

  // ---- 2) state (filters + location + booking + tracking + approvals) ----
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  // const [radiusKm, setRadiusKm] = useState(20); // REMOVED: Radius state removed

  const [userLoc, setUserLoc] = useState(null);
  const [locationState, setLocationState] = useState("idle"); // idle | requesting | ready | denied

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const [bookingOpen, setBookingOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);

  const [patient, setPatient] = useState({ name: "", phone: "", email: "" });
  const [schedule, setSchedule] = useState({ date: todayISO(), time: "" });

  const [toast, setToast] = useState("");
  const [bookings, setBookings] = useState([]);

  // tracking (live distance from user -> destination)
  const [tracking, setTracking] = useState({ active: false, placeId: null, distKm: null, etaMin: null });
  const watchIdRef = useRef(null);

  // ---- 3) localStorage hydration ----
  useEffect(() => {
    try {
      const saved = localStorage.getItem("healthcare_bookings_v2");
      if (saved) setBookings(JSON.parse(saved));
    } catch {
      setBookings([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("healthcare_bookings_v2", JSON.stringify(bookings));
  }, [bookings]);

  // ---- 4) derived list: filters + search (radius removed) ----
  const filteredPlaces = useMemo(() => {
    const q = query.trim().toLowerCase();
    return places
      .filter((p) => (typeFilter === "All" ? true : p.type === typeFilter))
      .map((p) => {
        const distanceKm = userLoc ? haversineKm(userLoc, { lat: p.lat, lng: p.lng }) : null;
        return { ...p, distanceKm };
      })
      // .filter((p) => (userLoc ? (p.distanceKm <= radiusKm ? true : false) : true)) // REMOVED: Radius filter logic removed
      .filter((p) => {
        if (!q) return true;
        return (
          p.name.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (a.distanceKm == null && b.distanceKm == null) return 0;
        if (a.distanceKm == null) return 1;
        if (b.distanceKm == null) return -1;
        return a.distanceKm - b.distanceKm;
      });
  }, [places, query, typeFilter, userLoc]);

  // ---- 5) location actions (use my location) ----
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setToast("Geolocation is not supported in this browser.");
      return;
    }
    setLocationState("requesting");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationState("ready");
        setToast("Location connected ✅"); // UPDATED: Removed "20km radius is now active"
      },
      () => {
        setLocationState("denied");
        setToast("Location permission denied. You can still open maps (destination only).");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // ---- 6) map directions (your location -> place) ----
  const openDirections = (place) => {
    const dest = `${place.lat},${place.lng}`;
    if (userLoc) {
      const origin = `${userLoc.lat},${userLoc.lng}`;
      // FIXED: Using standard Google Maps directions URL
      window.open(`https://www.google.com/maps/dir/${origin}/${dest}`, "_blank");
    } else {
      // FIXED: Using standard Google Maps search/query URL for destination only
      window.open(`https://www.google.com/maps/search/?api=1&query=${dest}`, "_blank");
    }
  };

  // ---- 7) tracking (live distance updates while you move) ----
  const startTracking = (place) => {
    if (!navigator.geolocation) {
      setToast("Geolocation not supported on this device.");
      return;
    }
    if (!userLoc) {
      setToast("First click “Use My Location” to enable tracking.");
      return;
    }

    // stop any previous watch
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    setTracking({ active: true, placeId: place.id, distKm: null, etaMin: null });

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const current = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        const dist = haversineKm(current, { lat: place.lat, lng: place.lng });
        // simple ETA (assume 30 km/h for vehicle / 5 km/h for walking; show both as "approx")
        const etaVehicle = Math.round((dist / 30) * 60); // minutes
        setTracking({ active: true, placeId: place.id, distKm: dist, etaMin: etaVehicle });
      },
      () => {
        setToast("Tracking paused (location access blocked).");
        setTracking({ active: false, placeId: null, distKm: null, etaMin: null });
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 2000 }
    );

    setToast("Tracking started — move toward the destination to see distance update.");
  };

  const stopTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setTracking({ active: false, placeId: null, distKm: null, etaMin: null });
    setToast("Tracking stopped.");
  };

  // ---- 8) visit + booking flows ----
  const openVisit = (place) => {
    setSelectedPlace(place);
    setSelectedService(null);
    setVisitOpen(true);
  };

  const startBooking = (place, service) => {
    setSelectedPlace(place);
    setSelectedService(service);
    setBookingOpen(true);

    setSchedule({ date: todayISO(), time: "" });
    setPatient({ name: "", phone: "", email: "" });
  };

  // ---- 9) "approval" simulation (real-feel) ----
  // pending bookings will auto resolve (approved/rejected) based on id hash once created
  // (so user can see "approved / rejected" like a real system)
  const runApprovalEngine = (list) => {
    return list.map((b) => {
      if (b.status !== "Pending") return b;
      const pct = hashToPct(b.id);
      const newStatus = pct < 75 ? "Approved" : "Rejected"; // 75% approve feel-realistic
      return { ...b, status: newStatus, reviewedAt: new Date().toISOString() };
    });
  };

  const confirmBooking = () => {
    if (!patient.name.trim() || !patient.phone.trim()) {
      setToast("Please enter your name & phone (minimum required).");
      return;
    }
    if (!schedule.date || !schedule.time) {
      setToast("Select appointment date & time.");
      return;
    }
    if (!selectedPlace || !selectedService) {
      setToast("Something went wrong. Please try again.");
      return;
    }

    const booking = {
      id: uid(),
      createdAt: new Date().toISOString(),
      status: "Pending",
      place: { id: selectedPlace.id, name: selectedPlace.name, type: selectedPlace.type, address: selectedPlace.address },
      service: selectedService.name,
      date: schedule.date,
      time: schedule.time,
      patient: { ...patient },
    };

    // add booking then immediately run approval engine (realistic “hospital review”)
    setBookings((prev) => {
      const next = [booking, ...prev];
      return runApprovalEngine(next);
    });

    setBookingOpen(false);
    setToast("✅ Appointment requested (status will show in My Appointments).");
  };

  // ---- 10) UI helpers ----
  const placeImage = (p) =>
    p.image ||
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='640' height='420'><rect width='640' height='420' fill='%23eef2ff'/><text x='50%' y='54%' font-family='Arial' font-size='24' text-anchor='middle' fill='%233b82f6'>Healthcare Place</text></svg>";

  return (
    <FeaturePage
      icon={Calendar}
      title="Nearby Care — Track & Book" // UPDATED: Removed "20km Radius" from title
      description="Grid view of hospitals / clinics / labs / pharmacies near you. Get directions (from your live location), start tracking, and book with approval status."
      gradient="from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* ===== TOP CONTROLS (Search, Filter, Location) ===== */}
        <div className="grid gap-4 md:grid-cols-12 mb-6">
          <div className="md:col-span-6"> {/* UPDATED: Changed from md:col-span-5 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search (name / type / address)…"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none"
              >
                <option>All</option>
                <option>Hospital</option>
                <option>Clinic</option>
                <option>Lab</option>
                <option>Pharmacy</option>
              </select>
            </div>
          </div>

          {/* RADIUS UI REMOVED */}

          <div className="md:col-span-3"> {/* UPDATED: Changed from md:col-span-2 */}
            <button
              onClick={requestLocation}
              className="w-full px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg transition-all"
            >
              <span className="inline-flex items-center gap-2">
                <Crosshair className="w-4 h-4" /> Use My Location
              </span>
            </button>
          </div>
        </div>

        {/* ===== TRACKING BAR (only if active) ===== */}
        {tracking.active && (
          <div className="mb-6 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                  Tracking live (your location → destination)
                </div>
                <div className="text-xs text-emerald-800 dark:text-emerald-300 mt-1">
                  Distance:{" "}
                  <span className="font-bold">
                    {tracking.distKm == null ? "—" : `${tracking.distKm.toFixed(2)} km`}
                  </span>{" "}
                  · ETA (approx vehicle):{" "}
                  <span className="font-bold">
                    {tracking.etaMin == null ? "—" : `${tracking.etaMin} min`}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={stopTracking}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all"
                >
                  Stop
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== GRID LIST (cards) ===== */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"> {/* UPDATED: Changed grid to 3-column layout (lg:grid-cols-3) */}
          {filteredPlaces.map((p) => (
            <div
              key={p.id}
              className="flex flex-col rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="h-36 w-full overflow-hidden rounded-t-3xl border-b border-gray-200 dark:border-gray-700">
                <img src={placeImage(p)} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
              </div>

              <div className="flex-1 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                        {p.name}
                      </h3>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {p.address}
                      </span>
                    </div>
                    <div className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      {userLoc ? (p.distanceKm != null ? `${p.distanceKm.toFixed(2)} km away` : "—") : "Enable location to see distance"} {/* UPDATED: Removed "for 20km filter" */}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => openDirections(p)}
                    className="inline-flex items-center gap-2 rounded-xl bg-green-600 text-white px-3 py-2 font-semibold hover:bg-green-700 transition-all"
                  >
                    <Map className="w-4 h-4" /> Directions
                  </button>

                  <button
                    onClick={() => startTracking(p)}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-3 py-2 font-semibold hover:bg-indigo-700 transition-all"
                    title="Live distance update using your GPS (turn on location first)"
                  >
                    <Activity className="w-4 h-4" /> Track
                  </button>

                  <button
                    onClick={() => openVisit(p)}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-3 py-2 font-semibold hover:bg-blue-700 transition-all"
                  >
                    <ArrowRight className="w-4 h-4" /> Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== MY APPOINTMENTS (status visible) ===== */}
        <div className="mt-8 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">My Appointments (Status)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                You can see if the hospital/clinic has approved your request (simulated review).
              </p>
            </div>
            <button
              onClick={() => setBookings((prev) => runApprovalEngine(prev))}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all"
            >
              Refresh Status
            </button>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {bookings.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 text-sm text-gray-600 dark:text-gray-300">
                No bookings yet. Pick a place → choose a doctor/service → confirm.
              </div>
            ) : (
              bookings.slice(0, 6).map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {b.place.name} · {b.place.type}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {b.service} — {b.date} · {b.time}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Patient: {b.patient.name} ({b.patient.phone})
                      </div>
                    </div>

                    <div
                      className={[
                        "px-3 py-1 rounded-full text-xs font-semibold",
                        b.status === "Approved"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                          : b.status === "Rejected"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200",
                      ].join(" ")}
                    >
                      {b.status}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ===== VISIT MODAL (doctors/services list) ===== */}
        <Modal open={visitOpen} title={selectedPlace ? `Visit • ${selectedPlace.name}` : "Visit"} onClose={() => setVisitOpen(false)}>
          {selectedPlace && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {selectedPlace.type} — {selectedPlace.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {selectedPlace.address}
                  </span>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {(selectedPlace.doctors || selectedPlace.services || []).map((it) => (
                  <div
                    key={it.name}
                    className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
                  >
                    <div className="font-bold text-gray-900 dark:text-white">{it.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {selectedPlace.doctors ? it.specialty : "Service"}
                    </div>
                    <div className="text-xs text-gray-700 dark:text-gray-200 mt-2">
                      Slots: {it.slots.join(" • ")}
                    </div>
                    <button
                      onClick={() => {
                        setVisitOpen(false);
                        startBooking(selectedPlace, it);
                      }}
                      className="mt-3 w-full rounded-xl bg-indigo-600 text-white font-semibold py-2 hover:bg-indigo-700 transition-all"
                    >
                      Book Appointment
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal>

        {/* ===== BOOKING MODAL ===== */}
        <Modal open={bookingOpen} title="Book Appointment (Realistic Flow)" onClose={() => setBookingOpen(false)}>
          {selectedPlace && selectedService && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {selectedPlace.name} · {selectedPlace.type}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Service/Doctor: <span className="font-medium">{selectedService.name}</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">Date</label>
                  <input
                    type="date"
                    value={schedule.date}
                    min={todayISO()}
                    onChange={(e) => setSchedule((s) => ({ ...s, date: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">Time</label>
                  <select
                    value={schedule.time}
                    onChange={(e) => setSchedule((s) => ({ ...s, time: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
                  >
                    <option value="">Select time</option>
                    {selectedService.slots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">Full Name</label>
                  <input
                    value={patient.name}
                    onChange={(e) => setPatient((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Your name"
                    className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">Phone</label>
                  <input
                    value={patient.phone}
                    onChange={(e) => setPatient((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="Mobile number"
                    className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">Email (optional)</label>
                  <input
                    value={patient.email}
                    onChange={(e) => setPatient((p) => ({ ...p, email: e.target.value }))}
                    placeholder="Email"
                    className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                onClick={confirmBooking}
                className="w-full rounded-xl bg-emerald-600 text-white font-bold py-3 hover:bg-emerald-700 transition-all"
              >
                Confirm Booking
              </button>

              <div className="text-xs text-gray-500 dark:text-gray-400">
                Note: This is a front-end realistic demo (booking is saved locally + approval is simulated for “real system” feel).
              </div>
            </div>
          )}
        </Modal>

        <Toast message={toast} onDone={() => setToast("")} />
      </div>
    </FeaturePage>
  );
}