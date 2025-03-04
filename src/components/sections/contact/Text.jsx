"use client"

import { useRef, useEffect, useState } from "react"

export default function Text({
  text,
  className = "",
  fontSize = 60,
  particleSize = 3,
  particleCount = 500,
}) {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const animationRef = useRef()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateDimensions = () => {
      const width = window.innerWidth > 768 ? 600 : window.innerWidth - 40
      const height = 200

      setDimensions({ width, height })
      canvas.width = width
      canvas.height = height
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  // Create particles from text
  useEffect(() => {
    if (dimensions.width === 0 || isInitialized) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw text to canvas
    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Create particles
    const newParticles = []

    // Sample pixels from the text
    const sampleRate = 4 // Sample every 4 pixels
    for (let y = 0; y < canvas.height; y += sampleRate) {
      for (let x = 0; x < canvas.width; x += sampleRate) {
        const index = (y * canvas.width + x) * 4
        const alpha = data[index + 3]

        if (alpha > 128) {
          // This pixel is part of the text
          newParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * particleSize + 1,
            color: `rgba(65, 105, 225, ${Math.random() * 0.5 + 0.5})`, // Royal blue with random opacity
            originalX: x,
            originalY: y,
            vx: 0,
            vy: 0,
          })
        }
      }
    }

    // If we have too many particles, randomly select a subset
    if (newParticles.length > particleCount) {
      const indices = new Set()
      while (indices.size < particleCount) {
        indices.add(Math.floor(Math.random() * newParticles.length))
      }

      particles.current = Array.from(indices).map((i) => newParticles[i])
    } else {
      particles.current = newParticles
    }

    setIsInitialized(true)
  }, [dimensions, text, fontSize, particleSize, particleCount, isInitialized])

  // Animate particles
  useEffect(() => {
    if (!isInitialized) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let mouseX = 0
    let mouseY = 0
    let isMouseOver = false

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      isMouseOver = true
    }

    const handleMouseLeave = () => {
      isMouseOver = false
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((particle) => {
        // Calculate force towards original position
        const dx = particle.originalX - particle.x
        const dy = particle.originalY - particle.y

        // Apply force
        particle.vx = dx * 0.05
        particle.vy = dy * 0.05

        // Apply mouse repulsion if mouse is over canvas
        if (isMouseOver) {
          const mdx = mouseX - particle.x
          const mdy = mouseY - particle.y
          const distance = Math.sqrt(mdx * mdx + mdy * mdy)

          if (distance < 100) {
            const force = (100 - distance) / 100
            particle.vx -= (mdx / distance) * force * 2
            particle.vy -= (mdy / distance) * force * 2
          }
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isInitialized])

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} className="mx-auto" />
    </div>
  )
}