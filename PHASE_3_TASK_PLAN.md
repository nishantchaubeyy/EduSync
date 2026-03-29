# 🚀 Phase 3 Implementation Task Plan

**Phase Level**: Nice to Have (Advanced Features)  
**Estimated Duration**: 2-3 weeks  
**Priority**: Lower (After Phase 1 & 2 completion)  
**Last Updated**: March 30, 2026

---

## 📋 Phase 3 Overview

Phase 3 focuses on advanced analytics, notifications, achievements, and user personalization features to enhance engagement and user experience.

### Core Phase 3 Components
1. ✅ **Advanced Analytics** (`analytics.getCourseAnalytics()`)
2. ✅ **Advanced Filtering & Sorting** (Course discovery improvements)
3. ✅ **Notification System** (Real-time notifications)
4. ✅ **User Preferences** (Personalization)
5. ✅ **Achievement/Badge System** (Gamification)

---

## 📊 TASK BREAKDOWN

### EPIC 1: Advanced Analytics System
**Goal**: Provide instructors with detailed course performance insights  
**Estimated Time**: 5-6 days

#### Task 1.1: Analytics Schema Design
- [ ] **Create new tables**:
  - [ ] `courseAnalyticsSnapshots` - Daily/weekly analytics snapshots
  - [ ] `userBehaviorMetrics` - User engagement tracking
  - [ ] `courseEngagementStats` - Course-level metrics
- [ ] **Add indexes** for analytics queries:
  - [ ] `courseAnalyticsSnapshots.by_course_date`
  - [ ] `userBehaviorMetrics.by_user_date`
- **Acceptance Criteria**:
  - All tables created with proper types and indexes
  - Schema validates analytics data structure

#### Task 1.2: Implement `analytics.getCourseAnalytics(courseId, startDate, endDate)`
- [ ] **Query logic**:
  - [ ] Aggregate enrollment data over date range
  - [ ] Calculate enrollment trends (day-by-day growth)
  - [ ] Calculate completion rates (completed_lessons / total_enrolled)
  - [ ] Calculate avg time spent (from progress tracking)
  - [ ] Calculate student retention (still active % over time)
  - [ ] Calculate engagement score (0-100 based on activity)
- [ ] **Return structure**:
  ```typescript
  {
    enrollmentTrend: [{date, count}],
    completionRate: number,         // 0-100%
    avgTimeSpent: number,           // hours
    studentRetention: number,       // 0-100%
    engagementScore: number,        // 0-100
    topPerformers: [{studentId, completionRate}],
    strugglingStudents: [{studentId, completionRate}],
  }
  ```
- **Acceptance Criteria**:
  - Returns accurate analytics data
  - Handles empty date ranges gracefully
  - Performs efficiently for large datasets
  - Auth check: Only instructor of course can access

#### Task 1.3: Create Analytics Dashboard Components
- [ ] **Frontend components**:
  - [ ] `AnalyticsDashboard.tsx` - Main analytics view
  - [ ] `EnrollmentChart.tsx` - Enrollment trend visualization
  - [ ] `PerformanceMetrics.tsx` - Key metrics cards
  - [ ] `StudentPerformanceTable.tsx` - Top/bottom performers
  - [ ] `DateRangeFilter.tsx` - Analytics time period selector
- [ ] **Charts library**: Use Chart.js or Recharts
- **Acceptance Criteria**:
  - Dashboard displays all analytics metrics
  - Charts render correctly with data
  - Date filtering works properly
  - Mobile responsive design

#### Task 1.4: Analytics Page Integration
- [ ] Create `/instructor/courses/[courseId]/analytics` page
- [ ] Add analytics route to instructor navigation
- [ ] Implement real-time updates
- [ ] Add export functionality (CSV/PDF)
- **Acceptance Criteria**:
  - Page loads with analytics data
  - All visualizations display correctly
  - Export functionality works

---

### EPIC 2: Advanced Filtering & Sorting System
**Goal**: Enhance course discovery with smart filtering  
**Estimated Time**: 4-5 days

#### Task 2.1: Enhanced Search Schema
- [ ] **Add to courses table**:
  - [ ] Full-text search field (indexed)
  - [ ] `searchTags` - Denormalized for fast filtering
  - [ ] `popularity` score (enroll_count * avg_rating)
- [ ] **Create search index**:
  - [ ] `courses.by_category_level_status`
  - [ ] `courses.by_rating_popularity`
  - [ ] `courses.by_category_status`
- **Acceptance Criteria**:
  - Indexes created and performant
  - Schema supports filtering requirements

#### Task 2.2: Implement `courses.searchCourses(query, filters)`
- [ ] **Query parameters**:
  - [ ] `query`: Search text (searches title, description, tags)
  - [ ] `category`: Filter by category
  - [ ] `level`: Filter by level (beginner/intermediate/advanced)
  - [ ] `minRating`: Filter by minimum rating
  - [ ] `sortBy`: Sort option (relevance, newest, rating, popular, price)
  - [ ] `limit`: Pagination limit (default 12)
  - [ ] `offset`: Pagination offset
- [ ] **Sorting logic**:
  - [ ] Relevance: Full-text score + recency boost
  - [ ] Newest: By createdAt descending
  - [ ] Rating: By rating descending, then by review_count
  - [ ] Popular: By enrollment_count descending
  - [ ] Trending: By recent_enrollments (last 7 days)
- **Acceptance Criteria**:
  - All filters work independently and in combination
  - Sorting produces correct results
  - Query performance < 500ms
  - Returns 0-100 results as specified

#### Task 2.3: Implement `courses.getFeaturedCourses()`
- [ ] **Logic**:
  - [ ] Top 5 rated courses (rating >= 4.5)
  - [ ] 5 newest published courses (last 30 days)
  - [ ] 5 trending courses (most enrollments last 7 days)
- [ ] **Returns**:
  ```typescript
  {
    topRated: Course[],
    newest: Course[],
    trending: Course[],
  }
  ```
- **Acceptance Criteria**:
  - Returns appropriate courses in each category
  - Cached for performance

#### Task 2.4: Course Discovery UI Components
- [ ] **Components**:
  - [ ] `AdvancedSearchBar.tsx` - Search with autocomplete
  - [ ] `FilterSidebar.tsx` - Category/level/rating filters
  - [ ] `SortDropdown.tsx` - Sorting options
  - [ ] `CourseGrid.tsx` - Filtered results display
  - [ ] `PaginationControls.tsx` - Course pagination
- [ ] **Features**:
  - [ ] Real-time search as user types
  - [ ] Filter pills showing active filters
  - [ ] "Clear all filters" button
  - [ ] Results counter (e.g., "Showing 12 of 156")
  - [ ] Loading states during search
- **Acceptance Criteria**:
  - All components render correctly
  - Filters update results in real-time
  - UI is intuitive and responsive

#### Task 2.5: Search Results Page Integration
- [ ] Update `/courses` page with advanced search
- [ ] Add search to course catalog
- [ ] Integrate featured courses carousel
- **Acceptance Criteria**:
  - Page loads with search functionality
  - Filters work correctly
  - Featured courses display

---

### EPIC 3: Notification System
**Goal**: Keep users informed of important events  
**Estimated Time**: 5-6 days

#### Task 3.1: Notifications Schema
- [ ] **Create notifications table**:
  ```typescript
  {
    recipientId: v.id("users"),
    senderId: v.id("users"),
    type: v.string(), // "assignment_due" | "new_enrollment" | "grade_posted" | "course_update"
    title: v.string(),
    message: v.string(),
    actionLink: v.string(),        // Link to related resource
    read: v.boolean(),
    createdAt: v.number(),
  }
  ```
- [ ] **Indexes**:
  - [ ] `notifications.by_recipient_read_date`
  - [ ] `notifications.by_recipient_unread`
  - [ ] `notifications.by_recipient_date`
- **Acceptance Criteria**:
  - Table created with proper structure
  - Indexes enable fast queries

#### Task 3.2: Notification Triggers
- [ ] **Create notification functions** in `convex/notifications.ts`:
  - [ ] `sendInstructorNotification()` - New enrollment
  - [ ] `sendStudentNotification()` - Course updates
  - [ ] `sendCourseStartNotification()` - Course begins
  - [ ] `sendGradeNotification()` - Grade posted
  - [ ] `sendAssignmentDueNotification()` - Due date reminder
- [ ] **Trigger logic**:
  - [ ] Integration with existing mutations (enrollments, progress, etc.)
  - [ ] Batch notifications to prevent spam
  - [ ] Respect user notification preferences
- **Acceptance Criteria**:
  - Notifications created for all key events
  - No duplicate notifications
  - Integrates without breaking existing code

#### Task 3.3: Implement Notification Queries
- [ ] **`notifications.getUnreadCount()`**
  - Returns count of unread notifications
  - Used for badge display
- [ ] **`notifications.getNotifications(limit, offset)`**
  - Returns paginated notifications for current user
  - Most recent first
- [ ] **`notifications.markAsRead(notificationId)`**
  - Updates notification read status
- [ ] **`notifications.markAllAsRead()`**
  - Marks all notifications as read
- [ ] **`notifications.deleteNotification(notificationId)`**
  - Soft delete notification
- **Acceptance Criteria**:
  - All queries return correct data
  - Proper auth checks in place
  - Performance is good for large datasets

#### Task 3.4: Notification UI Components
- [ ] **Components**:
  - [ ] `NotificationBell.tsx` - Bell icon with badge
  - [ ] `NotificationDropdown.tsx` - Dropdown menu
  - [ ] `NotificationItem.tsx` - Individual notification
  - [ ] `NotificationCenter.tsx` - Full notification page
  - [ ] `NotificationPreferences.tsx` - User settings
- [ ] **Features**:
  - [ ] Real-time notification count updates
  - [ ] Click to view related content
  - [ ] Mark as read/unread
  - [ ] Delete notifications
  - [ ] Notification preferences toggle
- **Acceptance Criteria**:
  - Notifications display in real-time
  - UI updates when marked as read
  - Mobile responsive design

#### Task 3.5: Notification Page Integration
- [ ] Add notification bell to navbar
- [ ] Create `/notifications` page for notification center
- [ ] Add notification preferences to user settings
- [ ] Setup notification sound/desktop alerts (optional)
- **Acceptance Criteria**:
  - Notifications visible throughout app
  - Preferences are respected
  - All features functional

---

### EPIC 4: User Preferences & Personalization
**Goal**: Allow users to customize their experience  
**Estimated Time**: 3-4 days

#### Task 4.1: User Preferences Schema
- [ ] **Extend users table** OR **create userPreferences table**:
  ```typescript
  {
    userId: v.id("users"),
    notifications: {
      enrollmentNotifications: boolean,
      gradeNotifications: boolean,
      courseUpdateNotifications: boolean,
      marketingEmails: boolean,
    },
    display: {
      theme: "light" | "dark" | "auto",
      language: "en" | "es" | "fr" | ... (add as needed),
      itemsPerPage: number,
    },
    learning: {
      preferredCategories: string[],
      difficultyLevel: "beginner" | "intermediate" | "advanced",
      learningStyle: "video" | "text" | "mix",
    },
    privacy: {
      profilePublic: boolean,
      showProgress: boolean,
      allowMessages: boolean,
    },
  }
  ```
- **Acceptance Criteria**:
  - Schema supports all preference types
  - Defaults set appropriately

#### Task 4.2: Implement Preference Mutations
- [ ] **`users.updatePreferences(preferences)`**
  - Update user preference settings
  - Validate inputs
  - Auth check: Only own preferences
- [ ] **`users.getPreferences()`**
  - Get current user's preferences
  - Apply defaults for missing fields
- **Acceptance Criteria**:
  - Preferences update correctly
  - Defaults applied for new users
  - Auth checks in place

#### Task 4.3: Preferences UI Components
- [ ] **Components**:
  - [ ] `PreferencesPage.tsx` - Main preferences view
  - [ ] `NotificationPreferences.tsx` - Notification settings
  - [ ] `DisplayPreferences.tsx` - Display settings
  - [ ] `LearningPreferences.tsx` - Learning customization
  - [ ] `PrivacyPreferences.tsx` - Privacy settings
  - [ ] `PreferenceSection.tsx` - Reusable section component
- [ ] **Features**:
  - [ ] Toggle settings with switches
  - [ ] Multi-select for categories/languages
  - [ ] Theme switcher (light/dark/auto)
  - [ ] Save button with success feedback
  - [ ] Reset to defaults option
- **Acceptance Criteria**:
  - All settings display and save correctly
  - UI is intuitive and responsive
  - Changes reflect immediately in app

#### Task 4.4: Preferences Integration
- [ ] Add preferences to user settings page
- [ ] Implement theme switching globally
- [ ] Apply language preferences (if supporting multiple)
- [ ] Use category preferences in course recommendations
- **Acceptance Criteria**:
  - All preferences functional
  - Changes reflected throughout app
  - No breaking changes to existing code

---

### EPIC 5: Achievement & Badge System
**Goal**: Gamify learning with achievements and badges  
**Estimated Time**: 5-7 days

#### Task 5.1: Achievement Schema
- [ ] **Create achievements table**:
  ```typescript
  {
    name: v.string(),              // e.g., "First Course"
    slug: v.string(),              // URL-friendly identifier
    description: v.string(),
    icon: v.string(),              // URL to badge icon
    rarity: "common" | "rare" | "epic" | "legendary",
    requirementType: string,       // "courses_completed" | "lessons_completed" | etc.
    requirementValue: v.number(),  // How many to unlock
    category: v.string(),          // "learning" | "engagement" | "milestone"
  }
  ```
- [ ] **Create userAchievements table** (join table):
  ```typescript
  {
    userId: v.id("users"),
    achievementId: v.id("achievements"),
    unlockedAt: v.number(),
    progress: v.number(),          // For gradual achievements
  }
  ```
- [ ] **Create userBadges table** (for display):
  ```typescript
  {
    userId: v.id("users"),
    badgeId: v.string(),           // "first_course", "100_days_streak"
    earnedAt: v.number(),
    displayOrder: v.number(),
  }
  ```
- [ ] **Indexes**:
  - [ ] `userAchievements.by_user`
  - [ ] `userAchievements.by_achievement`
  - [ ] `userBadges.by_user`
- **Acceptance Criteria**:
  - All tables created with proper structure
  - Relationships properly defined

#### Task 5.2: Achievement Definition & Validation
- [ ] **Pre-defined achievements**:
  - [ ] First Course Completed
  - [ ] 5 Courses Completed
  - [ ] 10 Courses Completed (Milestone)
  - [ ] All Lessons in a Course
  - [ ] Perfect Quiz Score
  - [ ] 7-Day Learning Streak
  - [ ] 30-Day Learning Streak
  - [ ] Course Speed Runner (Complete in < average time)
  - [ ] Quiz Master (90%+ score on all quizzes)
  - [ ] Returning Learner (30+ days since first course)
- [ ] **Seed achievements to database**
- **Acceptance Criteria**:
  - Achievements clearly defined
  - Conditions objectively measurable
  - Seeds successfully inserted

#### Task 5.3: Achievement Unlock Logic
- [ ] **Create `achievements.checkAndUnlockAchievements(userId)` mutation**:
  - [ ] Called after progress updates
  - [ ] Called after lesson completion
  - [ ] Called after quiz submission
  - [ ] Checks all achievement conditions
  - [ ] Creates userAchievements records
  - [ ] Sends notifications for new achievements
- [ ] **Implement condition checkers**:
  - [ ] Count completed courses
  - [ ] Check streaks (last N days active)
  - [ ] Verify quiz scores
  - [ ] Validate time spent
- [ ] **Performance optimization**:
  - [ ] Only check relevant achievements
  - [ ] Batch check if multiple triggers
  - [ ] Cache non-changing achievements
- **Acceptance Criteria**:
  - Achievements unlock correctly
  - No duplicate unlocks
  - Efficient execution

#### Task 5.4: Achievement Display Components
- [ ] **Components**:
  - [ ] `AchievementBadge.tsx` - Individual badge display
  - [ ] `AchievementGrid.tsx` - Grid of all achievements
  - [ ] `AchievementsPage.tsx` - Full achievements showcase
  - [ ] `EarnedAchievementNotification.tsx` - Toast/modal notification
  - [ ] `ProgressRing.tsx` - Circular progress for gradual achievements
  - [ ] `UserBadges.tsx` - User profile badge display
- [ ] **Features**:
  - [ ] Show locked/unlocked achievements
  - [ ] Display progress for in-progress achievements
  - [ ] Show unlock date and rarity
  - [ ] Tooltip with achievement description
  - [ ] Share achievement (optional)
- **Acceptance Criteria**:
  - Achievements display correctly
  - Locked achievements show progress
  - UI is visually appealing
  - Mobile responsive

#### Task 5.5: Achievement Integration
- [ ] Add achievements page to user profile
- [ ] Display badges on user profile
- [ ] Add achievements modal/toast on unlock
- [ ] Show recent achievements on dashboard
- [ ] Leaderboard feature (optional) - Top badge collectors
- [ ] Update progress setters to check achievements
- **Acceptance Criteria**:
  - Achievements integrated throughout app
  - Unlock notifications appear
  - User profile shows badges
  - No performance degradation

---

## 🔄 Cross-Cutting Tasks

#### Task 6.1: Testing & QA
- [ ] Unit tests for all analytics calculations
- [ ] Unit tests for search filtering logic
- [ ] Unit tests for notification triggers
- [ ] Unit tests for achievement conditions
- [ ] Integration tests for full workflows
- [ ] UI component tests
- **Acceptance Criteria**:
  - All critical functions tested
  - > 80% code coverage for new code
  - No regression in existing features

#### Task 6.2: Performance Optimization
- [ ] Profile analytics query performance
- [ ] Optimize search indexing
- [ ] Implement caching for repeated queries
- [ ] Lazy load notification components
- [ ] Paginate achievement lists
- **Acceptance Criteria**:
  - Analytics query < 500ms
  - Search < 300ms
  - No N+1 queries
  - Overall app performance maintained

#### Task 6.3: Documentation & Cleanup
- [ ] Document analytics API
- [ ] Document achievement conditions
- [ ] Update user guide with new features
- [ ] Add developer notes for future maintenance
- [ ] Code cleanup and refactoring
- **Acceptance Criteria**:
  - All features documented
  - Code is clean and maintainable
  - No dead code

#### Task 6.4: Deployment & Monitoring
- [ ] Migrate schema changes to production
- [ ] Deploy features in stages
- [ ] Monitor performance in production
- [ ] Collect user feedback
- [ ] Monitor achievement unlock rates
- **Acceptance Criteria**:
  - No deployment errors
  - Features working in production
  - Metrics collected

---

## 📅 Implementation Timeline

### Week 1: Analytics & Search (EPIC 1 & 2)
- Days 1-3: Analytics system implementation
- Days 4-5: Advanced search implementation
- Day 5: Testing & optimization

### Week 2: Notifications & Preferences (EPIC 3 & 4)
- Days 1-3: Notification system
- Days 3-4: User preferences
- Day 5: Testing & integration

### Week 3: Achievements (EPIC 5)
- Days 1-2: Achievement schema & logic
- Days 3-4: Achievement components & display
- Day 5: Testing, optimization, documentation

### Week 4 (Optional): Polish & Deploy
- Performance tuning
- User testing
- Bug fixes
- Production deployment

---

## 🎯 Acceptance Criteria Checklist

### Overall Phase 3 Completion
- [ ] All 5 EPICs implemented and tested
- [ ] Performance meets requirements
- [ ] At least 80% code coverage
- [ ] Documentation complete
- [ ] No regression in Phase 1/2 features
- [ ] User feedback collected
- [ ] Deployed to production

### Quality Metrics
- [ ] Analytics queries perform < 500ms
- [ ] Search returns results < 300ms
- [ ] Notification delivery < 1 second
- [ ] Zero critical bugs in new features
- [ ] Mobile responsiveness 100%
- [ ] Accessibility score > 90

---

## 🚀 Dependencies & Prerequisites

### Before Starting Phase 3:
1. ✅ Phase 1 must be complete
2. ✅ Phase 2 must be complete
3. ✅ All Phase 1/2 bugs fixed
4. ✅ Production deployment stabilized
5. ✅ Team familiar with codebase

### Required Libraries:
- `recharts` or `chart.js` for analytics visualizations
- `date-fns` for date calculations
- `zustand` (already used) for state management

---

## 📝 Notes

- Phase 3 features are optional but significantly improve user engagement
- Achievements system is highly customizable - these are suggestions
- Consider A/B testing different achievement definitions
- Notification frequency can be adjusted based on user feedback
- Analytics can be extended with more advanced metrics as needed

---

**Next Steps**:
1. Review and approve this task plan
2. Assign tasks to team members
3. Set up development environment
4. Begin EPIC 1 (Analytics)
5. Hold weekly progress reviews
