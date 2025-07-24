import { mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
// import { filter } from 'convex-helpers/server/filter';
import { paginationOptsValidator } from 'convex/server';
import { v } from 'convex/values';

export const create = mutation({
  args: {
    personalInfo: v.object({
      profilePictureId: v.id('_storage'),
      title: v.string(),
      firstName: v.string(),
      lastName: v.string(),
      middleName: v.optional(v.string()),
      gender: v.string(),
      dateOfBirth: v.string(),
      maritalStatus: v.string(),
      emailAddress: v.string(),
      stateOfOrigin: v.string(),
      lgaOfOrigin: v.string(),
      town: v.string(),
      lgaOfResidence: v.string(),
      townOfResidence: v.string(),
      residentialAddress: v.string(),
      phoneNumber: v.string(),
      alternatePhoneNumber: v.optional(v.string()),
    }),
    identificationInfo: v.object({
      nationalIdNumber: v.string(),
      abiaStateIdNumber: v.optional(v.string()),
    }),
    medicalInfo: v.object({
      bloodType: v.string(),
      bloodGroup: v.string(),
      hasMedicalCondition: v.boolean(),
      medicalConditionDetails: v.optional(v.array(v.string())),
    }),
    sponsorInfo: v.object({
      title: v.string(),
      firstName: v.string(),
      lastName: v.string(),
      middleName: v.optional(v.string()),
      gender: v.string(),
      mobileNumber: v.string(),
      alternateMobileNumber: v.optional(v.string()),
      residentialAddress: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('Not authenticated');
    }

    // Check if user already has a registration
    const existingRegistration = await ctx.db
      .query('registrations')
      .withIndex('userId', (q) => q.eq('userId', userId))
      .first();

    if (existingRegistration) {
      throw new Error('User already has a registration');
    }

    // Check if user has a profile picture
    const profilePicture = await ctx.storage.getUrl(
      args.personalInfo.profilePictureId
    );
    if (!profilePicture) {
      throw new Error('Profile picture not found');
    }

    const registrationId = await ctx.db.insert('registrations', {
      userId,
      // Personal Information
      profilePicture: profilePicture,
      title: args.personalInfo.title,
      firstName: args.personalInfo.firstName,
      lastName: args.personalInfo.lastName,
      middleName: args.personalInfo.middleName,
      gender: args.personalInfo.gender,
      dateOfBirth: args.personalInfo.dateOfBirth,
      maritalStatus: args.personalInfo.maritalStatus,
      emailAddress: args.personalInfo.emailAddress,
      stateOfOrigin: args.personalInfo.stateOfOrigin,
      lgaOfOrigin: args.personalInfo.lgaOfOrigin,
      town: args.personalInfo.town,
      lgaOfResidence: args.personalInfo.lgaOfResidence,
      townOfResidence: args.personalInfo.townOfResidence,
      residentialAddress: args.personalInfo.residentialAddress,
      phoneNumber: args.personalInfo.phoneNumber,
      alternatePhoneNumber: args.personalInfo.alternatePhoneNumber,

      // Identification Information
      nationalIdNumber: args.identificationInfo.nationalIdNumber,
      abiaStateIdNumber: args.identificationInfo.abiaStateIdNumber,

      // Medical Information
      bloodType: args.medicalInfo.bloodType,
      bloodGroup: args.medicalInfo.bloodGroup,
      hasMedicalCondition: args.medicalInfo.hasMedicalCondition,
      medicalConditionDetails: args.medicalInfo.medicalConditionDetails,

      // Sponsor Information
      sponsorTitle: args.sponsorInfo.title,
      sponsorFirstName: args.sponsorInfo.firstName,
      sponsorLastName: args.sponsorInfo.lastName,
      sponsorMiddleName: args.sponsorInfo.middleName,
      sponsorGender: args.sponsorInfo.gender,

      sponsorMobileNumber: args.sponsorInfo.mobileNumber,
      sponsorAlternateMobileNumber: args.sponsorInfo.alternateMobileNumber,
      sponsorResidentialAddress: args.sponsorInfo.residentialAddress,

      // Status
      status: 'pending',
    });

    await ctx.db.patch(userId, {
      isRegistered: true,
    });

    return registrationId;
  },
});

export const getCurrentUserRegistration = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    return await ctx.db
      .query('registrations')
      .withIndex('userId', (q) => q.eq('userId', userId))
      .first();
  },
});

export const getAll = query({
  args: {
    status: v.optional(
      v.union(
        v.literal('pending'),
        v.literal('approved'),
        v.literal('rejected')
      )
    ),
    search: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('Not authenticated');
    }

    const user = await ctx.db.get(userId);
    if (!user || !user.isAdmin) {
      throw new Error('Not authorized');
    }

    const registrations = await ctx.db.query('registrations').collect();

    // Filter by search term if provided
    if (args.search) {
      const searchTerm = args.search.toLowerCase();
      return registrations.filter(
        (reg) =>
          reg.firstName.toLowerCase().includes(searchTerm) ||
          reg.lastName.toLowerCase().includes(searchTerm) ||
          reg.emailAddress.toLowerCase().includes(searchTerm) ||
          reg.phoneNumber.includes(searchTerm)
      );
    }

    return registrations;
  },
});

export const getById = query({
  args: { id: v.id('registrations') },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('Not authenticated');
    }

    const user = await ctx.db.get(userId);
    if (!user || !user.isAdmin) {
      throw new Error('Not authorized');
    }

    return await ctx.db.get(args.id);
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id('registrations'),
    status: v.union(
      v.literal('pending'),
      v.literal('approved'),
      v.literal('rejected')
    ),
    reviewNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('Not authenticated');
    }

    const user = await ctx.db.get(userId);
    if (!user || !user.isAdmin) {
      throw new Error('Not authorized');
    }

    await ctx.db.patch(args.id, {
      status: args.status,
      reviewedAt: Date.now(),
      reviewedBy: userId,
      reviewNotes: args.reviewNotes,
    });
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
