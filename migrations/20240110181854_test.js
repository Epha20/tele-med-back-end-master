const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Users", deps: []
 * createTable() => "HealthCares", deps: [Users]
 * createTable() => "MedicalStaffs", deps: [Users, HealthCares]
 * createTable() => "Patients", deps: [Users]
 * createTable() => "Laboratories", deps: [MedicalStaffs, HealthCares]
 * createTable() => "ChatRooms", deps: [Patients, MedicalStaffs]
 * createTable() => "LaboratoryTests", deps: [Laboratories]
 * createTable() => "Appointments", deps: [ChatRooms]
 * createTable() => "LaboratoryRequests", deps: [Medicalstaffs, ChatRooms]
 * createTable() => "LaboratoryTestRquests", deps: [LaboratoryRequests, LaboratoryTests]
 * createTable() => "LaboratoryReports", deps: [Patients, MedicalStaffs, LaboratoryTestRquests, LaboratoryTests, ChatRooms, Laboratories, LaboratoryTests]
 * createTable() => "Pharmacies", deps: [MedicalStaffs, HealthCares, MedicalStaffs]
 * createTable() => "Medicines", deps: [Pharmacies]
 * createTable() => "HealthRecords", deps: [Patients, MedicalStaffs, LaboratoryReports, ChatRooms]
 * createTable() => "MedicinePrescriptions", deps: [MedicalStaffs, Medicines, ChatRooms]
 * createTable() => "Messages", deps: [Users, ChatRooms, MedicinePrescriptions, LaboratoryRequests, LaboratoryReports, Appointments]
 *
 */

const info = {
  revision: 1,
  name: "test",
  created: "2024-01-10T18:18:54.855Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Users",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        firstName: { type: Sequelize.STRING, field: "firstName" },
        lastName: { type: Sequelize.STRING, field: "lastName" },
        email: { type: Sequelize.STRING, field: "email", unique: true },
        phone: { type: Sequelize.STRING, field: "phone" },
        image: { type: Sequelize.STRING, field: "image" },
        role: { type: Sequelize.STRING, field: "role", allowNull: false },
        lastOnline: { type: Sequelize.DATE, field: "lastOnline" },
        password: { type: Sequelize.STRING, field: "password" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "HealthCares",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        HealthCareAdmin: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "HealthCareAdmin",
          references: { model: "Users", key: "id" },
          allowNull: false,
        },
        backgroundImage: {
          type: Sequelize.STRING,
          field: "backgroundImage",
          allowNull: false,
        },
        logo: { type: Sequelize.STRING, field: "logo", allowNull: false },
        HealthCareName: {
          type: Sequelize.STRING,
          field: "HealthCareName",
          allowNull: false,
        },
        address: { type: Sequelize.STRING, field: "address", allowNull: false },
        phoneNumber: {
          type: Sequelize.STRING,
          field: "phoneNumber",
          allowNull: true,
        },
        email: { type: Sequelize.STRING, field: "email", allowNull: true },
        website: { type: Sequelize.STRING, field: "website", allowNull: true },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: true,
        },
        longitude: {
          type: Sequelize.STRING,
          field: "longitude",
          allowNull: true,
        },
        latitude: {
          type: Sequelize.STRING,
          field: "latitude",
          allowNull: true,
        },
        openingHours: {
          type: Sequelize.STRING,
          field: "openingHours",
          allowNull: true,
        },
        closingHours: {
          type: Sequelize.STRING,
          field: "closingHours",
          allowNull: true,
        },
        openDays: {
          type: Sequelize.STRING,
          field: "openDays",
          allowNull: false,
        },
        closeDays: {
          type: Sequelize.STRING,
          field: "closeDays",
          allowNull: false,
        },
        is24Hours: {
          type: Sequelize.BOOLEAN,
          field: "is24Hours",
          allowNull: true,
        },
        isOnline: {
          type: Sequelize.BOOLEAN,
          field: "isOnline",
          allowNull: true,
        },
        isVerified: {
          type: Sequelize.BOOLEAN,
          field: "isVerified",
          allowNull: true,
        },
        isApproved: {
          type: Sequelize.BOOLEAN,
          field: "isApproved",
          allowNull: true,
        },
        isDeleted: {
          type: Sequelize.BOOLEAN,
          field: "isDeleted",
          allowNull: true,
        },
        isSuspended: {
          type: Sequelize.BOOLEAN,
          field: "isSuspended",
          allowNull: true,
        },
        isBlocked: {
          type: Sequelize.BOOLEAN,
          field: "isBlocked",
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "MedicalStaffs",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        userID: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "userID",
          references: { model: "Users", key: "id" },
          allowNull: false,
        },
        workExperiance: { type: Sequelize.STRING, field: "workExperiance" },
        role: { type: Sequelize.STRING, field: "role", allowNull: false },
        specialization: {
          type: Sequelize.STRING,
          field: "specialization",
          allowNull: false,
        },
        educationDegree: {
          type: Sequelize.STRING,
          field: "educationDegree",
          allowNull: false,
        },
        healthcarAdminAUtorization: {
          type: Sequelize.BOOLEAN,
          field: "healthcarAdminAUtorization",
          defaultValue: false,
          allowNull: false,
        },
        isAuthorizationField: {
          type: Sequelize.BOOLEAN,
          field: "isAuthorizationField",
          defaultValue: false,
          allowNull: false,
        },
        FinalAuth: {
          type: Sequelize.BOOLEAN,
          field: "FinalAuth",
          defaultValue: false,
          allowNull: false,
        },
        fieldsToBeUpdated: {
          type: Sequelize.STRING,
          field: "fieldsToBeUpdated",
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        HealthCareID: {
          type: Sequelize.UUID,
          field: "HealthCareID",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "HealthCares", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Patients",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        bloodtype: { type: Sequelize.STRING, field: "bloodtype" },
        userID: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "userID",
          references: { model: "Users", key: "id" },
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Laboratories",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        LaboratoryTechnician: {
          type: Sequelize.UUID,
          field: "LaboratoryTechnician",
          references: { model: "MedicalStaffs", key: "id" },
          allowNull: false,
        },
        halthcarId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "halthcarId",
          references: { model: "HealthCares", key: "id" },
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "ChatRooms",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        patientID: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "patientID",
          references: { model: "Patients", key: "id" },
          allowNull: false,
        },
        medicalStaffID: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "medicalStaffID",
          references: { model: "MedicalStaffs", key: "id" },
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "LaboratoryTests",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        laboratoryId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "laboratoryId",
          references: { model: "Laboratories", key: "id" },
          allowNull: false,
        },
        Name: { type: Sequelize.STRING, field: "Name", allowNull: false },
        price: { type: Sequelize.INTEGER, field: "price", allowNull: false },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Appointments",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        chatRoomID: {
          type: Sequelize.UUID,
          field: "chatRoomID",
          references: { model: "ChatRooms", key: "id" },
          allowNull: false,
        },
        deescription: {
          type: Sequelize.STRING,
          field: "deescription",
          allowNull: true,
        },
        date: { type: Sequelize.DATE, field: "date", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "LaboratoryRequests",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        senderID: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "senderID",
          descriptionText: { allowNull: false },
          references: { model: "Medicalstaffs", key: "id" },
          allowNull: false,
        },
        chatRoomID: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "chatRoomID",
          references: { model: "ChatRooms", key: "id" },
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "LaboratoryTestRquests",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        laboratoryRequestId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "laboratoryRequestId",
          references: { model: "LaboratoryRequests", key: "id" },
          allowNull: false,
        },
        laboratoryTestId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "laboratoryTestId",
          references: { model: "LaboratoryTests", key: "id" },
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "LaboratoryReports",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        patientID: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "patientID",
          references: { model: "Patients", key: "id" },
          allowNull: false,
        },
        medicalStaffID: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "medicalStaffID",
          references: { model: "MedicalStaffs", key: "id" },
          allowNull: false,
        },
        laboratoryRequestId: {
          type: Sequelize.UUID,
          field: "laboratoryRequestId",
          references: { model: "LaboratoryTestRquests", key: "id" },
          allowNull: false,
        },
        laboratoryTest: {
          type: Sequelize.UUID,
          field: "laboratoryTest",
          references: { model: "LaboratoryTests", key: "id" },
          allowNull: false,
        },
        chatRoomId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "chatRoomId",
          references: { model: "ChatRooms", key: "id" },
          allowNull: false,
        },
        laboratoryId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "laboratoryId",
          references: { model: "Laboratories", key: "id" },
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: false,
        },
        date: { type: Sequelize.DATE, field: "date", allowNull: false },
        time: { type: Sequelize.TIME, field: "time", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        laboratoryTestId: {
          type: Sequelize.UUID,
          field: "laboratoryTestId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "LaboratoryTests", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Pharmacies",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        pharmaciest: {
          type: Sequelize.UUID,
          field: "pharmaciest",
          references: { model: "MedicalStaffs", key: "id" },
          allowNull: false,
        },
        healthcareId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "healthcareId",
          references: { model: "HealthCares", key: "id" },
          allowNull: false,
        },
        address: { type: Sequelize.STRING, field: "address", allowNull: true },
        phone: { type: Sequelize.STRING, field: "phone", allowNull: true },
        email: { type: Sequelize.STRING, field: "email", allowNull: true },
        longitude: {
          type: Sequelize.STRING,
          field: "longitude",
          allowNull: true,
        },
        latitude: {
          type: Sequelize.STRING,
          field: "latitude",
          allowNull: true,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: true },
        logo: { type: Sequelize.STRING, field: "logo", allowNull: true },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: false,
        },
        online: { type: Sequelize.BOOLEAN, field: "online", allowNull: false },
        open: { type: Sequelize.BOOLEAN, field: "open", allowNull: false },
        openTime: {
          type: Sequelize.STRING,
          field: "openTime",
          allowNull: false,
        },
        closeTime: {
          type: Sequelize.STRING,
          field: "closeTime",
          allowNull: false,
        },
        openDays: {
          type: Sequelize.STRING,
          field: "openDays",
          allowNull: false,
        },
        closeDays: {
          type: Sequelize.STRING,
          field: "closeDays",
          allowNull: false,
        },
        isApproed: {
          type: Sequelize.BOOLEAN,
          field: "isApproed",
          defaultValue: false,
          allowNull: false,
        },
        isVerified: {
          type: Sequelize.BOOLEAN,
          field: "isVerified",
          defaultValue: false,
          allowNull: false,
        },
        inProgress: {
          type: Sequelize.BOOLEAN,
          field: "inProgress",
          defaultValue: false,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        pharmacyTechnician: {
          type: Sequelize.UUID,
          field: "pharmacyTechnician",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "MedicalStaffs", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Medicines",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        pharmacyId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "pharmacyId",
          references: { model: "Pharmacies", key: "id" },
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: false,
        },
        price: { type: Sequelize.INTEGER, field: "price", allowNull: false },
        quantity: {
          type: Sequelize.INTEGER,
          field: "quantity",
          allowNull: false,
        },
        expiryDate: {
          type: Sequelize.DATE,
          field: "expiryDate",
          allowNull: false,
        },
        manufacturer: {
          type: Sequelize.STRING,
          field: "manufacturer",
          allowNull: false,
        },
        type: { type: Sequelize.STRING, field: "type", allowNull: false },
        sideEffects: {
          type: Sequelize.STRING,
          field: "sideEffects",
          allowNull: false,
        },
        dosage: { type: Sequelize.STRING, field: "dosage", allowNull: false },
        image: { type: Sequelize.STRING, field: "image", allowNull: false },
        active: { type: Sequelize.BOOLEAN, field: "active", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "HealthRecords",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        patientID: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "patientID",
          references: { model: "Patients", key: "id" },
          allowNull: false,
        },
        medicalStaffID: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "medicalStaffID",
          references: { model: "MedicalStaffs", key: "id" },
          allowNull: false,
        },
        LaboratoryResultId: {
          type: Sequelize.UUID,
          field: "LaboratoryResultId",
          references: { model: "LaboratoryReports", key: "id" },
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: false,
        },
        date: { type: Sequelize.DATE, field: "date", allowNull: false },
        chatRoomId: {
          type: Sequelize.UUID,
          field: "chatRoomId",
          references: { model: "ChatRooms", key: "id" },
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "MedicinePrescriptions",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        senderID: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "senderID",
          references: { model: "MedicalStaffs", key: "id" },
          allowNull: false,
        },
        medicineId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "medicineId",
          references: { model: "Medicines", key: "id" },
          allowNull: false,
        },
        text: { type: Sequelize.STRING, field: "text", allowNull: false },
        chatRoomID: {
          type: Sequelize.UUID,
          field: "chatRoomID",
          references: { model: "ChatRooms", key: "id" },
          allowNull: false,
        },
        type: { type: Sequelize.STRING, field: "type", allowNull: false },
        medicineName: {
          type: Sequelize.STRING,
          field: "medicineName",
          allowNull: false,
        },
        medicineDosage: {
          type: Sequelize.STRING,
          field: "medicineDosage",
          allowNull: false,
        },
        medicineFrequency: {
          type: Sequelize.STRING,
          field: "medicineFrequency",
          allowNull: false,
        },
        medicineDuration: {
          type: Sequelize.STRING,
          field: "medicineDuration",
          allowNull: false,
        },
        medicineQuantity: {
          type: Sequelize.STRING,
          field: "medicineQuantity",
          allowNull: false,
        },
        medicineRefill: {
          type: Sequelize.STRING,
          field: "medicineRefill",
          allowNull: true,
        },
        medicineNotes: {
          type: Sequelize.STRING,
          field: "medicineNotes",
          allowNull: false,
        },
        medicinePrescriptionDate: {
          type: Sequelize.STRING,
          field: "medicinePrescriptionDate",
          allowNull: false,
        },
        medicinePrescriptionTime: {
          type: Sequelize.STRING,
          field: "medicinePrescriptionTime",
          allowNull: true,
        },
        medicinePrescriptionExpirationDate: {
          type: Sequelize.STRING,
          field: "medicinePrescriptionExpirationDate",
          allowNull: true,
        },
        medicinePrescriptionExpirationTime: {
          type: Sequelize.STRING,
          field: "medicinePrescriptionExpirationTime",
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Messages",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        senderID: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "senderID",
          references: { model: "Users", key: "id" },
          allowNull: false,
        },
        text: { type: Sequelize.STRING, field: "text" },
        type: { type: Sequelize.STRING, field: "type", allowNull: false },
        chatRoomID: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "chatRoomID",
          references: { model: "ChatRooms", key: "id" },
          allowNull: false,
        },
        image: { type: Sequelize.STRING, field: "image", allowNull: true },
        medicinePrescriptionId: {
          type: Sequelize.UUID,
          field: "medicinePrescriptionId",
          references: { model: "MedicinePrescriptions", key: "id" },
          allowNull: true,
        },
        laboratoryRequestId: {
          type: Sequelize.UUID,
          field: "laboratoryRequestId",
          references: { model: "LaboratoryRequests", key: "id" },
          allowNull: true,
        },
        laboratoryResultId: {
          type: Sequelize.UUID,
          field: "laboratoryResultId",
          references: { model: "LaboratoryReports", key: "id" },
          allowNull: true,
        },
        appointmentId: {
          type: Sequelize.UUID,
          field: "appointmentId",
          references: { model: "Appointments", key: "id" },
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["Appointments", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["ChatRooms", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["HealthCares", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["HealthRecords", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Laboratories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["LaboratoryReports", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["LaboratoryRequests", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["LaboratoryTestRquests", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["LaboratoryTests", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["MedicalStaffs", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Medicines", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["MedicinePrescriptions", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Messages", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Patients", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Pharmacies", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Users", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
