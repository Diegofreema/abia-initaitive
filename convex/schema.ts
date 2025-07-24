import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { authTables } from '@convex-dev/auth/server';

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    isAdmin: v.boolean(),
    isRegistered: v.boolean(),
  }).index('email', ['email']),
  registrations: defineTable({
    userId: v.id('users'),
    // Personal Information
    profilePicture: v.optional(v.string()),
    title: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    middleName: v.optional(v.string()),
    gender: v.string(),
    dateOfBirth: v.string(),
    maritalStatus: v.string(),
    emailAddress: v.string(),
    lgaOfOrigin: v.string(),
    town: v.string(),
    lgaOfResidence: v.string(),
    townOfResidence: v.string(),
    residentialAddress: v.string(),
    phoneNumber: v.string(),
    alternatePhoneNumber: v.optional(v.string()),

    // Identification Information
    nationalIdNumber: v.string(),
    abiaStateIdNumber: v.optional(v.string()),

    // Medical Information
    bloodType: v.string(),
    bloodGroup: v.string(),
    hasMedicalCondition: v.boolean(),
    medicalConditionDetails: v.optional(v.array(v.string())),

    // Sponsor Information
    sponsorTitle: v.string(),
    sponsorFirstName: v.string(),
    sponsorLastName: v.string(),
    sponsorMiddleName: v.optional(v.string()),
    sponsorGender: v.string(),

    sponsorMobileNumber: v.string(),
    sponsorAlternateMobileNumber: v.optional(v.string()),
    sponsorResidentialAddress: v.string(),

    // Status
    status: v.union(
      v.literal('pending'),
      v.literal('approved'),
      v.literal('rejected')
    ),

    reviewedAt: v.optional(v.number()),
    reviewedBy: v.optional(v.id('users')),
    reviewNotes: v.optional(v.string()),
  })
    .index('userId', ['userId'])
    .index('status', ['status'])
    .searchIndex('name', {
      searchField: 'firstName',
      filterFields: ['lastName', 'middleName'],
    }),
});

export default schema;
