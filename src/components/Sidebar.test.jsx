import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import { readFileSync } from 'fs'
import { join } from 'path'
import Sidebar from './Sidebar'

/**
 * Bug Condition Exploration Test
 * 
 * **Validates: Requirements 1.1, 1.2**
 * 
 * Property 1: Bug Condition - Hardcoded Contact Data Detection
 * 
 * CRITICAL: This test MUST FAIL on unfixed code - failure confirms the bug exists.
 * 
 * This test checks that Sidebar.jsx does NOT contain hardcoded contact data.
 * On unfixed code, this test will FAIL because hardcoded strings exist.
 * After the fix, this test will PASS because data will be imported from src/data.js.
 */
describe('Bug Condition Exploration - Hardcoded Contact Data', () => {
  it('Property 1: Sidebar.jsx should NOT contain hardcoded contact data', () => {
    // Read the Sidebar.jsx file content
    const sidebarPath = join(process.cwd(), 'src/components/Sidebar.jsx')
    const sidebarContent = readFileSync(sidebarPath, 'utf-8')

    // Define the hardcoded values that should NOT exist after fix
    const hardcodedValues = {
      email: 'ritik.attri2024@nst.rishihood.edu.in',
      phone: '6230298736',
      incorrectLinkedIn: 'https://www.linkedin.com/in/ritik-atri-b44a50315/',
      incorrectGitHub: 'https://github.com/ritikattri773',
      incorrectAvatar: 'https://github.com/ritikattri773.png'
    }

    // Check for each hardcoded value
    const foundHardcodedData = []

    if (sidebarContent.includes(hardcodedValues.email)) {
      foundHardcodedData.push(`Found hardcoded email: ${hardcodedValues.email}`)
    }

    if (sidebarContent.includes(hardcodedValues.phone)) {
      foundHardcodedData.push(`Found hardcoded phone: ${hardcodedValues.phone}`)
    }

    if (sidebarContent.includes(hardcodedValues.incorrectLinkedIn)) {
      foundHardcodedData.push(`Found hardcoded incorrect LinkedIn: ${hardcodedValues.incorrectLinkedIn}`)
    }

    if (sidebarContent.includes(hardcodedValues.incorrectGitHub)) {
      foundHardcodedData.push(`Found hardcoded incorrect GitHub: ${hardcodedValues.incorrectGitHub}`)
    }

    if (sidebarContent.includes(hardcodedValues.incorrectAvatar)) {
      foundHardcodedData.push(`Found hardcoded incorrect avatar: ${hardcodedValues.incorrectAvatar}`)
    }

    // Assert that NO hardcoded data should exist (expected behavior after fix)
    // On UNFIXED code: This will FAIL with counterexamples
    // On FIXED code: This will PASS (no hardcoded data found)
    if (foundHardcodedData.length > 0) {
      throw new Error(
        `Hardcoded contact data detected in Sidebar.jsx:\n${foundHardcodedData.join('\n')}`
      )
    }
    
    expect(foundHardcodedData).toHaveLength(0)
  })

  it('Property 1 (PBT): Sidebar.jsx should import contact data from centralized source', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        // Read the Sidebar.jsx file content
        const sidebarPath = join(process.cwd(), 'src/components/Sidebar.jsx')
        const sidebarContent = readFileSync(sidebarPath, 'utf-8')

        // After fix, Sidebar should import from data.js
        const hasImportStatement = 
          sidebarContent.includes('from') && 
          (sidebarContent.includes('./data') || sidebarContent.includes('../data'))

        // Expected behavior: Sidebar imports data from centralized source
        // On UNFIXED code: This will FAIL (no import exists)
        // On FIXED code: This will PASS (import exists)
        return hasImportStatement
      }),
      { numRuns: 1 }
    )
  })
})

/**
 * Preservation Property Tests
 * 
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**
 * 
 * Property 2: Preservation - Visual and Functional Behavior Preservation
 * 
 * These tests observe and capture the baseline behavior on UNFIXED code.
 * They ensure that after the fix, all visual and functional aspects are preserved.
 * 
 * EXPECTED OUTCOME: These tests MUST PASS on unfixed code.
 */
describe('Preservation Property Tests - Baseline Behavior', () => {
  it('Property 2.1: Sidebar component renders without errors', () => {
    const { container } = render(<Sidebar />)
    expect(container.querySelector('.sidebar')).toBeInTheDocument()
  })

  it('Property 2.2: All expected CSS classes are present', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<Sidebar />)
        
        // Check for all expected CSS classes
        const expectedClasses = [
          'sidebar',
          'sidebar-avatar',
          'sidebar-name',
          'sidebar-username',
          'sidebar-bio',
          'sidebar-follow-btn',
          'sidebar-socials',
          'sidebar-social-btn',
          'sidebar-info',
          'sidebar-info-item',
          'sidebar-achievements',
          'sidebar-orgs-title',
          'achievement-badges',
          'achievement-badge',
          'sidebar-orgs',
          'sidebar-orgs-list',
          'org-pill'
        ]

        const allClassesPresent = expectedClasses.every(className => {
          return container.querySelector(`.${className}`) !== null
        })

        return allClassesPresent
      }),
      { numRuns: 10 }
    )
  })

  it('Property 2.3: Link structure is preserved with proper attributes', () => {
    const { container } = render(<Sidebar />)
    
    // Check resume link
    const resumeLink = container.querySelector('a.sidebar-follow-btn')
    expect(resumeLink).toBeInTheDocument()
    expect(resumeLink).toHaveAttribute('href')
    expect(resumeLink).toHaveAttribute('target', '_blank')
    expect(resumeLink).toHaveAttribute('rel', 'noreferrer')
    
    // Check social links
    const socialLinks = container.querySelectorAll('.sidebar-social-btn')
    expect(socialLinks).toHaveLength(2)
    socialLinks.forEach(link => {
      expect(link).toHaveAttribute('href')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
  })

  it('Property 2.4: Email link uses mailto: protocol', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<Sidebar />)
        
        // Find email link in sidebar-info
        const infoItems = container.querySelectorAll('.sidebar-info-item')
        let emailLink = null
        
        infoItems.forEach(item => {
          const link = item.querySelector('a[href^="mailto:"]')
          if (link) emailLink = link
        })
        
        return emailLink !== null && emailLink.getAttribute('href').startsWith('mailto:')
      }),
      { numRuns: 10 }
    )
  })

  it('Property 2.5: Phone link uses tel: protocol', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<Sidebar />)
        
        // Find phone link in sidebar-info
        const infoItems = container.querySelectorAll('.sidebar-info-item')
        let phoneLink = null
        
        infoItems.forEach(item => {
          const link = item.querySelector('a[href^="tel:"]')
          if (link) phoneLink = link
        })
        
        return phoneLink !== null && phoneLink.getAttribute('href').startsWith('tel:')
      }),
      { numRuns: 10 }
    )
  })

  it('Property 2.6: Info items have correct SVG icons', () => {
    const { container } = render(<Sidebar />)
    
    const infoItems = container.querySelectorAll('.sidebar-info-item')
    expect(infoItems.length).toBeGreaterThanOrEqual(3)
    
    // Each info item should have an SVG
    infoItems.forEach(item => {
      const svg = item.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('viewBox', '0 0 16 16')
      expect(svg).toHaveAttribute('width', '16')
      expect(svg).toHaveAttribute('height', '16')
    })
  })

  it('Property 2.7: Skills section exists and renders skill pills', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<Sidebar />)
        
        // Check skills section exists
        const skillsSection = container.querySelector('.sidebar-orgs')
        if (!skillsSection) return false
        
        // Check skill pills exist
        const skillPills = container.querySelectorAll('.org-pill')
        
        // Should have multiple skills
        return skillPills.length > 0
      }),
      { numRuns: 10 }
    )
  })

  it('Property 2.8: Achievements section displays badge images', () => {
    const { container } = render(<Sidebar />)
    
    const achievementsSection = container.querySelector('.sidebar-achievements')
    expect(achievementsSection).toBeInTheDocument()
    
    const badgeImages = container.querySelectorAll('.achievement-badge')
    expect(badgeImages.length).toBeGreaterThan(0)
    
    // Each badge should have src, alt, and title attributes
    badgeImages.forEach(badge => {
      expect(badge).toHaveAttribute('src')
      expect(badge).toHaveAttribute('alt')
      expect(badge).toHaveAttribute('title')
    })
  })

  it('Property 2.9: Component structure preserves all major sections', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<Sidebar />)
        
        // Verify all major sections exist
        const hasAvatar = container.querySelector('.sidebar-avatar') !== null
        const hasName = container.querySelector('.sidebar-name') !== null
        const hasUsername = container.querySelector('.sidebar-username') !== null
        const hasBio = container.querySelector('.sidebar-bio') !== null
        const hasResumeBtn = container.querySelector('.sidebar-follow-btn') !== null
        const hasSocials = container.querySelector('.sidebar-socials') !== null
        const hasInfo = container.querySelector('.sidebar-info') !== null
        const hasAchievements = container.querySelector('.sidebar-achievements') !== null
        const hasSkills = container.querySelector('.sidebar-orgs') !== null
        
        return hasAvatar && hasName && hasUsername && hasBio && 
               hasResumeBtn && hasSocials && hasInfo && 
               hasAchievements && hasSkills
      }),
      { numRuns: 10 }
    )
  })

  it('Property 2.10: External links have security attributes', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<Sidebar />)
        
        // Get all external links (resume, GitHub, LinkedIn)
        const externalLinks = [
          container.querySelector('.sidebar-follow-btn'),
          ...Array.from(container.querySelectorAll('.sidebar-social-btn'))
        ]
        
        // All external links should have target="_blank" and rel="noreferrer"
        return externalLinks.every(link => {
          return link && 
                 link.getAttribute('target') === '_blank' && 
                 link.getAttribute('rel') === 'noreferrer'
        })
      }),
      { numRuns: 10 }
    )
  })
})
