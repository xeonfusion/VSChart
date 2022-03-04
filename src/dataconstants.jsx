import moment from "moment";

export const medgroups = [
  {
    id: 1,
    title: "Propofol",
    unit: "mg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "InductionAgent",
    color: "yellow",
  },
  {
    id: 2,
    title: "Fentanyl",
    unit: "mcg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "Opioid",
    color: "deepskyblue",
  },
  {
    id: 3,
    title: "Lidocaine",
    unit: "mg",
    route: "Subcutaneous",
    durationunit: "bolus (sec)",
    type: "LocalAnaesthetic",
    color: "grey",
  },
  {
    id: 4,
    title: "Rocuronium",
    unit: "mg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "MuscleRelaxant",
    color: "red",
  },
  {
    id: 5,
    title: "Ringers",
    unit: "ml/hr",
    route: "Intravenous",
    durationunit: "min",
    type: "IVfluid",
    color: "white",
  },
  {
    id: 6,
    title: "Saline 0.9%",
    unit: "ml/hr",
    route: "Intravenous",
    durationunit: "min",
    type: "IVfluid",
    color: "white",
  },
];

export const eventgroups = [
  {
    id: 1,
    title: "Events",
  },
];

export const respdatagroups = [
  {
    id: 1,
    title: "FIO2",
    unit: "%",
  },
  {
    id: 2,
    title: "ETO2",
    unit: "%",
  },
  {
    id: 3,
    title: "Vti",
    unit: "ml",
  },
  {
    id: 4,
    title: "Vte",
    unit: "ml",
  },
  {
    id: 5,
    title: "RR",
    unit: "/min",
  },
  {
    id: 6,
    title: "PEEP",
    unit: "cm H2O",
  },
  {
    id: 7,
    title: "ETCO2",
    unit: "mm Hg",
  },
  {
    id: 8,
    title: "PPeak",
    unit: "cm H2O",
  },
  {
    id: 9,
    title: "PPlateau",
    unit: "cm H2O",
  },
  {
    id: 10,
    title: "FIN2O",
    unit: "%",
  },
  {
    id: 11,
    title: "ETN2O",
    unit: "%",
  },
  {
    id: 12,
    title: "FIAA",
    unit: "%",
  },
  {
    id: 13,
    title: "ETAA",
    unit: "%",
  },
  {
    id: 14,
    title: "AgentAA",
    unit: "",
  },
  {
    id: 15,
    title: "MAC_SUM",
    unit: "%",
  },
  {
    id: 16,
    title: "MinuteVolExp",
    unit: "L/min",
  },
  {
    id: 17,
    title: "Compliance",
    unit: "mL/cm H2O",
  },
];

export const hemodatagroups = [
  {
    id: 1,
    title: "NIBP_Systolic",
    unit: "mm Hg",
  },
  {
    id: 2,
    title: "NIBP_Diastolic",
    unit: "mm Hg",
  },
  {
    id: 3,
    title: "NIBP_Mean",
    unit: "mm Hg",
  },
  {
    id: 4,
    title: "ECG_HR",
    unit: "/min",
  },
  {
    id: 5,
    title: "SpO2",
    unit: "%",
  },
  {
    id: 6,
    title: "P1_Systolic",
    unit: "mm Hg",
  },
  {
    id: 7,
    title: "P1_Diastolic",
    unit: "mm Hg",
  },
  {
    id: 8,
    title: "P1_Mean",
    unit: "mm Hg",
  },
  {
    id: 9,
    title: "P2_Systolic",
    unit: "mm Hg",
  },
  {
    id: 10,
    title: "P2_Diastolic",
    unit: "mm Hg",
  },
  {
    id: 11,
    title: "P2_Mean",
    unit: "mm Hg",
  },
  {
    id: 12,
    title: "CVP",
    unit: "mm Hg",
  },
  {
    id: 13,
    title: "ST_II",
    unit: "mm",
  },
  {
    id: 14,
    title: "ST_V5",
    unit: "mm",
  },
  {
    id: 15,
    title: "ST_avL",
    unit: "mm",
  },
  {
    id: 16,
    title: "PPV",
    unit: "%",
  },
  {
    id: 17,
    title: "PVI",
    unit: "%",
  },
];

export const miscdatagroups = [
  {
    id: 1,
    title: "T1_Temp",
    unit: "deg C",
  },
  {
    id: 2,
    title: "T2_Temp",
    unit: "deg C",
  },
  {
    id: 3,
    title: "BIS",
    unit: "",
  },
  {
    id: 4,
    title: "BIS_BSR",
    unit: "",
  },
  {
    id: 5,
    title: "BIS_EMG",
    unit: "",
  },
  {
    id: 6,
    title: "BIS_SQI",
    unit: "mm Hg",
  },
  {
    id: 7,
    title: "EEG_Entropy",
    unit: "",
  },
  {
    id: 8,
    title: "EMG_Entropy",
    unit: "",
  },
  {
    id: 9,
    title: "BSR_Entropy",
    unit: "",
  },
];

export const meditems = [
  {
    id: 1,
    group: 1,
    title: "150",
    start_time: moment().add(0.5, "m"),
    end_time: moment().add(1, "m"),
    //rightTitle: "",
  },
  {
    id: 2,
    group: 1,
    title: "50",
    start_time: moment().add(1.5, "m"),
    end_time: moment().add(2, "m"),
    //rightTitle: "",
  },

  {
    id: 3,
    group: 2,
    title: "75",
    start_time: moment().add(0, "m"),
    end_time: moment().add(0.5, "m"),
  },
  {
    id: 4,
    group: 3,
    title: "100",
    start_time: moment().add(0, "m"),
    end_time: moment().add(0.5, "m"),
  },
  {
    id: 5,
    group: 4,
    title: "50",
    start_time: moment().add(1, "m"),
    end_time: moment().add(1.5, "m"),
  },
  {
    id: 6,
    group: 5,
    title: "60",
    start_time: moment().add(0, "m"),
    end_time: moment().add(10, "m"),
  },
];

export const eventitems = [
  {
    id: 1,
    group: 1,
    title: "Equipment Check",
    start_time: moment().subtract(4, "m"),
    end_time: moment().subtract(3, "m"),
    note: "",
  },
  {
    id: 2,
    group: 1,
    title: "Patient In",
    start_time: moment().subtract(3, "m"),
    end_time: moment().subtract(2, "m"),
    note: "",
  },
  {
    id: 3,
    group: 1,
    title: "Anesthesia Start",
    start_time: moment().subtract(2, "m"),
    end_time: moment().subtract(1, "m"),
    note: "",
  },
  {
    id: 4,
    group: 1,
    title: "Preoxygenation",
    start_time: moment().subtract(1, "m"),
    end_time: moment().add(0, "m"),
    note: "",
  },
  {
    id: 5,
    group: 1,
    title: "Induction",
    start_time: moment().add(0, "m"),
    end_time: moment().add(1, "m"),
    note: "",
  },
  {
    id: 6,
    group: 1,
    title: "Intubation/SGA In",
    start_time: moment().add(3, "m"),
    end_time: moment().add(4, "m"),
    note: "",
  },
  {
    id: 7,
    group: 1,
    title: "Surgery Start",
    start_time: moment().add(4, "m"),
    end_time: moment().add(5, "m"),
    note: "",
  },
];

export const addevents = [
  "Equipment Check",
  "Patient In",
  "Anesthesia Start",
  "Preoxygenation",
  "Induction",
  "Intubation/SGA In",
  "Surgery Start",
  "Surgery Stop",
  "Extubation/SGA Out",
  "Patient Out",
  "Anaesthesia Stop",
  "Blood Loss",
  "Add Note",
  "Other",
];

export const outputitems = [
  {
    id: 1,
    group: 1,
    title: "50",
    start_time: moment().add(0, "m"),
    end_time: moment().add(1, "m"),
    note: "",
  },
  {
    id: 2,
    group: 2,
    title: "100",
    start_time: moment().add(0, "m"),
    end_time: moment().add(1, "m"),
    note: "",
  },
]

export const addoutputs = [
  { title: "Est. Blood Loss" },
  { title: "Urine" },
  { title: "CSF" },
  { title: "ICD"},
  { title: "Other" },
]

export const outputunits = [
  "ml",
  "L",
];

export const outputdurations = ["min", "sec"];


export const outputgroups = [
  {
    id: 1,
    title: "Est. Blood Loss",
    unit: "ml",
    durationunit: "min",
  },
  {
    id: 2,
    title: "Urine",
    unit: "ml",
    durationunit: "min",
  },
  {
    id: 3,
    title: "Other",
    unit: "ml",
    durationunit: "min",
  },
]

export const outputGroups = [
  {
    id: 1,
    title: "Est. Blood Loss",
    unit: "ml",
    durationunit: "min",
  },
  {
    id: 2,
    title: "Urine",
    unit: "ml",
    durationunit: "min",
  },
  {
    id: 3,
    title: "Other",
    unit: "ml",
    durationunit: "min",
  },
  {
    id: 4,
    title: "CSF",
    unit: "ml",
    durationunit: "min",
  },
  {
    id: 5,
    title: "ICD",
    unit: "ml",
    durationunit: "min",
  },

]
