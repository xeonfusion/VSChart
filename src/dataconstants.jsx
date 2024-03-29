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
    color: "lightcyan",
  },
  {
    id: 6,
    title: "Saline 0.9%",
    unit: "ml/hr",
    route: "Intravenous",
    durationunit: "min",
    type: "IVfluid",
    color: "lightcyan",
  },
];

export const eventgroups = [
  {
    id: 1,
    title: "Events",
  },
];

export const proceduregroups = [
  {
    id: 1,
    title: "Procedures",
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
  },
  {
    id: 2,
    group: 1,
    title: "50",
    start_time: moment().add(1.5, "m"),
    end_time: moment().add(2, "m"),
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

export const procedureitems = [
  {
    id: 1,
    group: 1,
    title: "Peripheral IV Line",
    start_time: moment().subtract(2, "m"),
    end_time: moment().subtract(1, "m"),
    note: "",
  },
  {
    id: 2,
    group: 1,
    title: "Intubation/SGA In",
    start_time: moment().add(3, "m"),
    end_time: moment().add(4, "m"),
    note: "",
  },
  {
    id: 3,
    group: 1,
    title: "Arterial Line",
    start_time: moment().add(5, "m"),
    end_time: moment().add(6, "m"),
    note: "",
  },
  

];

export const addevents = [
  "Equipment Check",
  "Patient In",
  "Preinduction Assessment",
  "Anesthesia Start",
  "Preoxygenation",
  "Induction",
  "Intubation/SGA In",
  "Positioning",
  "Surgery Start",
  "Surgery Stop",
  "Emergence",
  "Extubation/SGA Out",
  "Patient Out",
  "Anaesthesia Stop",
  "Blood Loss",
  "Artefact",
  "Handover",
  "Sternotomy",
  "Heparin",
  "CPB On",
  "CPB Off",
  "Cross Clamp On",
  "Cross Clamp Off",
  "Protamine",
  "Mayfield Pin In",
  "Mayfield Pin Out",
  "Temporary Clip On",
  "Temporary Clip Off",
  "Permanent Clip On",
  "Throat Pack In",
  "Throat Pack Out",
  "Tourniquet On",
  "Tourniquet Off",
  "Call For Help",
  "CPR",
  "Add Note",
  "Other",
];

export const addprocedures = [
  "Peripheral IV Line",
  "Arterial Line",
  "Central Venous Line",
  "PICC Line",
  "OPA/NPA insertion",
  "Mask ventilation",
  "Intubation",
  "SGA insertion",
  "NG/OG Tube",
  "Temperature Probe",
  "Spinal Anaesthesia",
  "Epidural Anaesthesia",
  "Nerve Block",
  "TOE/TEE",
  "Nerve Monitor",
  "Processed EEG",
  "Fibreoptic Bronchoscopy",
  "PAC insertion",
  "Midline Catheter",
  "Urinary Catheter",
  "Chest Tube",
  "Drain insertion",
  "Pacing",
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

export const medGroups = [
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
    color: "lightcyan",
  },
  {
    id: 6,
    title: "Midazolam",
    unit: "mg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "Hypnotic",
    color: "orange",
  },
  {
    id: 6,
    title: "Suxamethonium",
    unit: "mg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "MuscleRelaxant",
    color: "red",
  },
  {
    id: 7,
    title: "Morphine",
    unit: "mg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "Opioid",
    color: "deepskyblue",
  },
  {
    id: 8,
    title: "Cisatracurium",
    unit: "mg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "MuscleRelaxant",
    color: "red",
  },
  {
    id: 9,
    title: "Thiopentone",
    unit: "mg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "InductionAgent",
    color: "yellow",
  },
  {
    id: 10,
    title: "Saline 0.9%",
    unit: "ml/hr",
    route: "Intravenous",
    durationunit: "min",
    type: "IVfluid",
    color: "lightcyan",
  },
  {
    id: 11,
    title: "Glycopyrrolate",
    unit: "mg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "Anticholinergic",
    color: "lawngreen",
  },
  {
    id: 12,
    title: "Ephedrine",
    unit: "mg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "Vasopressor",
    color: "#debfd9",
  },
  {
    id: 13,
    title: "Ondansetron",
    unit: "mg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "Antiemetic",
    color: "#edc282",
  },
  {
    id: 14,
    title: "Remifentanil",
    unit: "mcg/kg/min",
    route: "Intravenous",
    durationunit: "continuous",
    type: "Opioid",
    color: "deepskyblue",
  },
  {
    id: 15,
    title: "Ketamine",
    unit: "mg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "InductionAgent",
    color: "yellow",
  },
  {
    id: 16,
    title: "Dexmedetomidine",
    unit: "mcg/kg/hr",
    route: "Intravenous",
    durationunit: "continuous",
    type: "Other",
    color: "white",
  },
  {
    id: 17,
    title: "Phenylephrine",
    unit: "mcg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "Vasopressor",
    color: "#debfd9",
  },
  {
    id: 18,
    title: "Sugammadex",
    unit: "mg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "Other",
    color: "white",
  },
  {
    id: 19,
    title: "Neostigmine",
    unit: "mg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "Other",
    color: "white",
  },
  {
    id: 20,
    title: "Dexamethasone",
    unit: "mg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "Other",
    color: "white",
  },
  {
    id: 21,
    title: "Atropine",
    unit: "mg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "Anticholinergic",
    color: "lawngreen",
  },
  {
    id: 22,
    title: "Norepinephrine",
    unit: "mcg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "Vasopressor",
    color: "debfd9",
  },
  {
    id: 23,
    title: "Epinephrine",
    unit: "mcg",
    route: "Intravenous",
    durationunit: "bolus (sec)",
    type: "Vasopressor",
    color: "debfd9",
  },
];

export const medItems = [
  {
    id: 1,
    group: 1,
    title: "150",
    start_time: moment().add(0.5, "m"),
    end_time: moment().add(1, "m"),
    rightTitle: "",
  },
  {
    id: 2,
    group: 2,
    title: "75",
    start_time: moment().add(0, "m"),
    end_time: moment().add(0.5, "m"),
  },
  {
    id: 3,
    group: 3,
    title: "100",
    start_time: moment().add(0, "m"),
    end_time: moment().add(0.5, "m"),
  },
  {
    id: 4,
    group: 4,
    title: "50",
    start_time: moment().add(1, "m"),
    end_time: moment().add(1.5, "m"),
  },
  {
    id: 5,
    group: 5,
    title: "60",
    start_time: moment().add(0, "m"),
    end_time: moment().add(10, "m"),
  },
];

export const doseunits = [
  "mg",
  "mcg",
  "mcg/kg/min",
  "ml",
  "ml/hr",
  "mg/kg/hr",
  "mcg/kg/hr",
  "mg/hr",
  "U",
  "U/hr",
  "%",
  "L/min",
];

export const doseroutes = [
  "Intravenous",
  "Subcutaneous",
  "Intramuscular",
  "Intranasal",
  "Endotracheal",
  "Topical",
  "Mucosal",
];

export const eventtimes = [
  "Equipment Check",
  "Patient In",
  "Anesthesia Start",
  "Preoxygenation",
  "Induction",
  "Intubation/SGA In",
  "Surgery Start",
  "Surgery Stop",
  "Emergence",
  "Extubation/SGA Out",
  "Patient Out",
  "Anaesthesia Stop",
  "Add Note",
  "Other",
];

export const durations = ["bolus (sec)", "bolus (min)", "min", "sec", "continuous"];

export const addmeds = [
  { title: "Atropine" },
  { title: "Cisatracurium" },
  { title: "Dexamethasone" },
  { title: "Dexmedetomidine" },
  { title: "Ephedrine" },
  { title: "Epinephrine" },
  { title: "Glycopyrrolate" },
  { title: "Ketamine" },
  { title: "Midazolam" },
  { title: "Morphine" },
  { title: "Nesotigmine" },
  { title: "Norepinephrine" },
  { title: "Ondansetron" },
  { title: "Phenylephrine" },
  { title: "Remifentanil" },
  { title: "Saline 0.9%" },
  { title: "Sugammadex" },
  { title: "Suxamethonium" },
  { title: "Thiopentone" },
];

export const medtypes = [
  { type: "Other", color: "white", pattern: "solid" },
  { type: "InductionAgent", color: "yellow", pattern: "solid" },
  { type: "Hypnotic", color: "orange", pattern: "solid" },
  { type: "IVfluid", color: "lightcyan", pattern: "solid" },
  { type: "Opioid", color: "deepskyblue", pattern: "solid" },
  { type: "LocalAnaesthetic", color: "grey", pattern: "solid" },
  { type: "MuscleRelaxant", color: "red", pattern: "solid" },
  { type: "Anticholinergic", color: "lawngreen", pattern: "solid" },
  { type: "Vasopressor", color: "#debfd9", pattern: "solid" },
  { type: "Antiemetic", color: "#edc282", pattern: "solid" },
  { type: "Vasodilators", color: "#debfd9", pattern: "striped" },
];
