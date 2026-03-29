# EduSync - Backend Requirements & API Specifications

## ⚠️ Prerequisites

**Before implementing these requirements, you must:**

1. ✅ **Set up Convex** - Create a project at https://dashboard.convex.dev
2. ✅ **Set up Clerk** - Create an app at https://dashboard.clerk.com
3. ✅ **Configure Environment Variables** - Follow [SETUP_GUIDE.md](SETUP_GUIDE.md)

**See [SETUP_GUIDE.md](SETUP_GUIDE.md) for complete setup instructions.**

---

## Overview
This document outlines all backend requirements needed to support the improved Dashboard and Instructor interfaces, including data models, Convex queries, mutations, and API specifications.

---

## Table of Contents
1. [Data Models & Schema Updates](#data-models--schema-updates)
2. [Convex Functions (Queries & Mutations)](#convex-functions)
3. [Authentication & Authorization](#authentication--authorization)
4. [API Endpoints](#api-endpoints)
5. [Real-time Features](#real-time-features)
6. [Validation Rules](#validation-rules)
7. [Error Handling](#error-handling)

---

## Data Models & Schema Updates

### Current Schema Status
The `convex/schema.ts` file contains the following tables:
- `users` - User profiles with roles (STUDENT, INSTRUCTOR, ADMIN)
- `courses` - Course information
- `lessons` - Video lessons within courses
- `quizzes` - Quiz assessments
- `questions` - Quiz questions
- `enrollments` - Student course enrollments
- `progress` - Student lesson completion tracking

### Required Schema Additions/Modifications

#### 1. **Course Enhancements**
```typescript
// Add these fields to courses table:
- slug: v.string()              // URL-friendly course identifier
- category: v.string()          // Course category (e.g., "Technology", "Arts")
- image: v.string()             // Course thumbnail image URL
- thumbnail: v.string()         // Course card image
- rating: v.number()            // Average rating (0-5 scale)
- status: v.string()            // "draft" | "published" | "archived"
- level: v.string()             // "beginner" | "intermediate" | "advanced"
- duration: v.number()          // Total hours of course content
- tags: v.array(v.string())    // Course tags for filtering
- createdAt: v.number()         // Timestamp when created
- updatedAt: v.number()         // Last modified timestamp
```

#### 2. **Progress Tracking Enhancements**
```typescript
// Modify progress table:
- percentage: v.number()        // Completion percentage (0-100)
- lessonDuration: v.number()   // Time spent in minutes
- lastAccessed: v.number()     // Last view timestamp
- watchedDuration: v.number()  // Video watch duration in seconds
```

#### 3. **Course Reviews Table** (NEW)
```typescript
defineTable({
    studentId: v.id("users"),
    courseId: v.id("courses"),
    rating: v.number(),         // 1-5 rating
    comment: v.string(),        // Review text
    createdAt: v.number(),
    helpful: v.number(),        // Count of helpful votes
})
.index("by_course", ["courseId"])
.index("by_student", ["studentId"])
```

#### 4. **Activity Log Table** (NEW)
```typescript
defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    action: v.string(),         // "enrolled" | "submitted_quiz" | "completed_lesson"
    details: v.string(),        // JSON stringified details
    timestamp: v.number(),
})
.index("by_user", ["userId"])
.index("by_course", ["courseId"])
```

#### 5. **Notifications Table** (NEW)
```typescript
defineTable({
    recipientId: v.id("users"),
    senderId: v.id("users"),
    type: v.string(),          // "assignment_due" | "new_enrollment" | "grade_posted"
    message: v.string(),
    read: v.boolean(),
    link: v.string(),
    createdAt: v.number(),
})
.index("by_recipient", ["recipientId"])
```

---

## Convex Functions

### 1. **User Queries & Mutations**

#### ✅ DONE: `users.getCurrentUser()`
Returns current authenticated user profile

#### ❌ REQUIRED: `users.getUserStats()`
```typescript
// Returns user statistics for dashboard
// Returns:
{
    totalCoursesEnrolled: number,
    completedCourses: number,
    inProgressCourses: number,
    totalLearningHours: number,
    averageCompletion: number,  // percentage
    streakDays: number,
}
```

#### ❌ REQUIRED: `users.updateUserProfile()`
```typescript
// Args:
{
    name: string,
    bio: string,
    avatar: string,
    preferences: {
        notifications: boolean,
        languagePreference: string,
    }
}
```

#### ❌ REQUIRED: `users.getAllInstructors()`
Returns list of all instructors with their course counts

---

### 2. **Course Queries & Mutations**

#### ✅ DONE: `courses.getCourses()`
Returns all published courses

#### ✅ DONE: `courses.getCourseById(courseId)`
Returns single course details

#### ✅ DONE: `courses.createCourse(title, description)`
Creates new course (instructor only)

#### ❌ REQUIRED: `courses.updateCourse(courseId, updates)`
```typescript
// Args:
{
    courseId: v.id("courses"),
    title?: string,
    description?: string,
    image?: string,
    thumbnail?: string,
    category?: string,
    level?: string,
    tags?: string[],
    status?: "draft" | "published" | "archived",
}
```

#### ❌ REQUIRED: `courses.deleteCourse(courseId)`
Soft delete course (archive it)

#### ❌ REQUIRED: `courses.publishCourse(courseId)`
Change course status from draft to published

#### ❌ REQUIRED: `courses.getCoursesWithStats()`
```typescript
// Returns courses with enrollment and rating stats
// For instructors to see their course performance
// Returns:
[{
    ...course,
    enrollmentCount: number,
    completionRate: number,
    averageRating: number,
    reviewCount: number,
}]
```

#### ❌ REQUIRED: `courses.searchCourses(query, filters)`
```typescript
// Args:
{
    query: string,              // Search term
    category?: string,
    level?: string,
    minRating?: number,
}
// Returns matching courses sorted by relevance
```

#### ❌ REQUIRED: `courses.getFeaturedCourses()`
Returns top-rated, newest, or trending courses

---

### 3. **Enrollment Queries & Mutations**

#### ✅ DONE: `enrollments.getStudentEnrollments()`
Returns student's enrolled courses

#### ✅ DONE: `enrollments.enrollInCourse(courseId)`
Enrolls student in course

#### ❌ REQUIRED: `enrollments.unenrollFromCourse(courseId)`
Removes student enrollment from course

#### ❌ REQUIRED: `enrollments.getCourseEnrollments(courseId)`
```typescript
// For instructors - get all students in a course
// Returns: [
//   {
//     studentId,
//     studentName,
//     enrolledAt,
//     completionRate,
//     lastActive,
//   }
// ]
```

#### ❌ REQUIRED: `enrollments.getEnrollmentStats(courseId)`
```typescript
// Returns:
{
    totalEnrolled: number,
    activeStudents: number,      // Accessed in last 7 days
    completionRate: number,      // Average %
    averageProgress: number,
}
```

---

### 4. **Progress Queries & Mutations**

#### ❌ REQUIRED: `progress.markLessonComplete(lessonId)`
```typescript
// Args: { lessonId: v.id("lessons") }
// Marks lesson as complete for current student
```

#### ❌ REQUIRED: `progress.updateLessonProgress(lessonId, watchedDuration)`
```typescript
// Args: {
//     lessonId: v.id("lessons"),
//     watchedDuration: number,    // in seconds
// }
```

#### ❌ REQUIRED: `progress.getCourseProgress(courseId)`
```typescript
// Returns current student's progress in course
// Returns:
{
    courseId,
    studentId,
    completionPercentage: number,
    completedLessons: number,
    totalLessons: number,
    lastAccessed: number,
    lessonsProgress: [{
        lessonId,
        lessonTitle,
        completed: boolean,
        watchedDuration: number,
        totalDuration: number,
    }]
}
```

#### ❌ REQUIRED: `progress.getStudentProgressByInstructor(courseId)`
```typescript
// For instructor - get all student progress in course
// Returns: [{
//     studentId,
//     studentName,
//     completionPercentage,
//     lastAccessed,
//     lessonsCompleted,
// }]
```

#### ❌ REQUIRED: `progress.getProgressStats(studentId)`
```typescript
// Returns:
{
    totalCoursesEnrolled: number,
    averageCompletion: number,
    totalLearningHours: number,
    streakDays: number,
    recentActivity: [{action, course, timestamp}],
}
```

---

### 5. **Lesson Queries & Mutations**

#### ✅ DONE: `lessons.getLessonsByCourse(courseId)`
Returns all lessons in a course

#### ✅ DONE: `lessons.createLesson(courseId, title, videoUrl, order)`
Creates new lesson

#### ❌ REQUIRED: `lessons.updateLesson(lessonId, updates)`
```typescript
// Args:
{
    lessonId: v.id("lessons"),
    title?: string,
    videoUrl?: string,
    description?: string,
    order?: number,
    duration?: number,     // in minutes
}
```

#### ❌ REQUIRED: `lessons.deleteLesson(lessonId)`
Removes lesson from course

#### ❌ REQUIRED: `lessons.reorderLessons(courseId, lessonOrders)`
```typescript
// Args:
{
    courseId: v.id("courses"),
    lessonOrders: [{lessonId, order}]
}
// Updates lesson order within course
```

#### ❌ REQUIRED: `lessons.getLessonDetail(lessonId)`
Returns lesson with full details including progress

---

### 6. **Quiz Queries & Mutations**

#### ❌ REQUIRED: `quizzes.getQuizzesByCourse(courseId)`
Returns all quizzes in a course

#### ❌ REQUIRED: `quizzes.createQuiz(courseId, title, passingScore)`
Creates new quiz

#### ❌ REQUIRED: `quizzes.updateQuiz(quizId, updates)`
Updates quiz properties

#### ❌ REQUIRED: `quizzes.getQuizWithQuestions(quizId)`
Returns quiz with all questions

#### ❌ REQUIRED: `quizzes.submitQuizAnswers(quizId, answers)`
```typescript
// Args:
{
    quizId: v.id("quizzes"),
    answers: [{questionId, selectedAnswer}]
}
// Returns:
{
    score: number,
    percentage: number,
    passed: boolean,
    feedback: string,
    answersReview: [{
        questionId,
        studentAnswer,
        correctAnswer,
        isCorrect: boolean,
    }]
}
```

---

### 7. **Activity & Analytics Queries**

#### ❌ REQUIRED: `analytics.getRecentActivity(limit)`
```typescript
// Returns recent activities across platform
// For instructors: within their courses
// Returns: [{action, actor, course, timestamp}]
```

#### ❌ REQUIRED: `analytics.getCourseAnalytics(courseId, startDate, endDate)`
```typescript
// Returns:
{
    enrollmentTrend: [{date, count}],
    completionRate: number,
    avgTimeSpent: number,
    studentRetention: number,
    engagementScore: number,
}
```

---

## Authentication & Authorization

### Current Status
- ✅ Clerk integration for authentication
- ✅ Role-based access control (STUDENT, INSTRUCTOR, ADMIN)
- ✅ User sync via webhooks (via http.ts)

### Required Enhancements

#### 1. **Permission Middleware**
Ensure all mutations check:
```typescript
- User is authenticated (ctx.auth.getUserIdentity())
- User has correct role for action
- User owns the resource (for personal data)
- User is instructor of course (for course actions)
```

#### 2. **Role-Based Access**
| Action | STUDENT | INSTRUCTOR | ADMIN |
|--------|---------|-----------|-------|
| Enroll in courses | ✓ | ✓ | ✓ |
| View course content | ✓ | ✓ | ✓ |
| Create courses | ✗ | ✓ | ✓ |
| Edit own courses | ✗ | ✓ | ✓ |
| Grade submissions | ✗ | ✓ | ✓ |
| Manage users | ✗ | ✗ | ✓ |
| View analytics | Limited | ✓ | ✓ |

#### 3. **Data Privacy**
- Students can only see their own progress
- Instructors can only see progress in their courses
- No cross-course student data visibility

---

## API Endpoints

### Next.js Server Actions (in `src/actions/`)

#### ✅ DONE: `actions/courses.ts`
- Fetches courses for UI

#### ✅ DONE: `actions/enrollments.ts`
- Handles enrollment logic

#### ❌ REQUIRED: `actions/progress.ts`
- Update progress
- Mark lessons complete
- Get progress stats

#### ❌ REQUIRED: `actions/quizzes.ts`
- Submit quiz answers
- Get quiz results
- Track quiz attempts

#### ❌ REQUIRED: `actions/analytics.ts`
- Get course analytics
- Get student statistics
- Get activity logs

---

## Real-time Features

### Required Convex Subscriptions

#### 1. **Progress Updates**
Students should see real-time progress updates in their dashboard

#### 2. **Enrollment Notifications**
Instructors see new student enrollments instantly

#### 3. **Grade Updates**
Students notified when grades are posted

#### 4. **Activity Feed**
Recent activities update in real-time for instructors

---

## Validation Rules

### Course Validation
```typescript
- Title: Required, 3-200 characters, unique per instructor
- Description: Required, 10-5000 characters
- Category: Must be from predefined list
- Level: Must be "beginner" | "intermediate" | "advanced"
- Image URL: Valid URL, proper image format
- Duration: Must be positive number
```

### Lesson Validation
```typescript
- Title: Required, 1-200 characters
- VideoUrl: Valid video URL (YouTube, Vimeo, S3, etc.)
- Order: Must be positive, sequential within order
- Duration: Must be positive, > 0 minutes
```

### Quiz Validation
```typescript
- Title: Required, 1-200 characters
- Questions: At least 1 question required
- PassingScore: 1-100, valid percentage
- TimeLimit: Optional, if set must be > 0 minutes
```

### Question Validation
```typescript
- Text: Required, 5-500 characters
- Options: Array of 2-6 options
- Correct: Must be one of the options
- Type: "multiple_choice" | "true_false"
```

---

## Error Handling

### Required Error Types

#### 1. **Authentication Errors**
```typescript
{
    code: "UNAUTHENTICATED",
    message: "User must be logged in",
    statusCode: 401
}
```

#### 2. **Authorization Errors**
```typescript
{
    code: "UNAUTHORIZED",
    message: "User does not have permission to access this resource",
    statusCode: 403
}
```

#### 3. **Not Found Errors**
```typescript
{
    code: "NOT_FOUND",
    message: "Course/Lesson/Quiz not found",
    statusCode: 404
}
```

#### 4. **Validation Errors**
```typescript
{
    code: "INVALID_INPUT",
    message: "Invalid field: {fieldName}",
    details: [{field, error}],
    statusCode: 400
}
```

#### 5. **Business Logic Errors**
```typescript
{
    code: "ALREADY_ENROLLED",
    message: "User is already enrolled in this course",
    statusCode: 409
}
```

---

## Implementation Priority

### Phase 1 (Critical - Must Have)
- [ ] Course schema updates (image, category, status, level, tags)
- [ ] Progress tracking enhancements (percentage, watchedDuration)
- [ ] `courses.updateCourse()`
- [ ] `courses.publishCourse()`
- [ ] `progress.markLessonComplete()`
- [ ] `progress.getCourseProgress()`
- [ ] `enrollments.getStudentStats()`

### Phase 2 (Important - Should Have)
- [ ] Activity Log table and queries
- [ ] `analytics.getRecentActivity()`
- [ ] `courses.searchCourses()`
- [ ] `courses.getCoursesWithStats()`
- [ ] `enrollments.getCourseEnrollments()`
- [ ] Course Reviews table and mutation

### Phase 3 (Nice to Have)
- [ ] `analytics.getCourseAnalytics()`
- [ ] Advanced filtering and sorting
- [ ] Notification system
- [ ] User preferences storage
- [ ] Achievement/Badge system

---

## Testing Checklist

- [ ] All Convex functions have proper auth checks
- [ ] All mutations validate input
- [ ] Error messages are user-friendly
- [ ] Pagination works for large datasets
- [ ] Real-time subscriptions update correctly
- [ ] Cross-role access is properly restricted
- [ ] Date/timestamp handling is consistent (UTC)
- [ ] Performance tested with large datasets

---

## Database Indexing Strategy

### Critical Indexes (Already Present)
- `users.by_clerkId`
- `courses.by_instructor`
- `enrollments.by_student_course`
- `progress.by_student_lesson`
- `lessons.by_course`

### Recommended Additional Indexes
- `enrollments.by_course` - For instructor enrollment queries
- `courses.by_status` - For filtering published courses
- `progress.by_student` - For progress aggregation
- `activityLog.by_user` - For activity queries
- `reviews.by_course` - For course ratings

---

## Migration Plan

1. Add schema fields to existing tables
2. Create new tables (reviews, activityLog, notifications)
3. Implement core queries Phase 1
4. Test with sample data
5. Deploy and monitor
6. Implement Phase 2 features
7. Add advanced Phase 3 features

---

**Last Updated**: March 24, 2026
**Next Review**: April 14, 2026
