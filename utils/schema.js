import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

// export const MockInterview=pgTable('mockInterview',{
//     id:serial('id').primaryKey(),
//     jsonMockResp:text('jsonMockResp').notNull(),
//     jobPosition:varchar('jobPosition').notNull(),
//     jobDesc:varchar('jobDesc').notNull(),
//     jobExperience:varchar('jobExperience').notNull(),
//     createdBy:varchar('createdBy').notNull(),
//     createdAt:varchar('createdAt'),
//     mockId:varchar('mockId').notNull()
// })

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    interviewType: varchar('interviewType'),  // "General" or "Area-Specific"
    jobPosition: varchar('jobPosition'),  // Nullable for area-specific
    jobDesc: varchar('jobDesc'),  // Nullable for area-specific
    jobExperience: varchar('jobExperience'),  // Nullable for area-specific
    jobDomain: varchar('jobDomain'),  // Only for area-specific
    diffLevel: varchar('diffLevel'),  // Only for area-specific
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull()
});


export const UserAnswer=pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),
})