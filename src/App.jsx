"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, FileText, Zap, Loader2, Copy, Check, Menu, X } from "lucide-react"
import "./index.css"
import { whoAsked } from "who-asked"
import logo from "./assets/logo.svg"

function App() {
  const [mode, setMode] = useState("docs")
  const [theme, setTheme] = useState("light")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const initialTheme = savedTheme || systemTheme
    setTheme(initialTheme)
    updateThemeClass(initialTheme)
  }, [])

  const updateThemeClass = (newTheme) => {
    const html = document.documentElement
    if (newTheme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    updateThemeClass(newTheme)
  }

  const toggleMode = () => {
    setMode(mode === "docs" ? "generator" : "docs")
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between">
            {/* Logo/Title */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img src={logo || "/placeholder.svg"} alt="who-asked logo" className="w-6 h-6 sm:w-8 sm:h-8" />
              <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#ff5858] to-[#ffc8c8] bg-clip-text text-transparent">
                who-asked
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">v1.0.0</div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Controls */}
            <div className="hidden sm:flex items-center space-x-3 lg:space-x-4">
              {/* Mode Toggle */}
              <button
                onClick={toggleMode}
                className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
              >
                {mode === "docs" ? (
                  <>
                    <Zap className="w-4 h-4" />
                    <span className="hidden lg:inline">Generator</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span className="hidden lg:inline">Docs</span>
                  </>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
              >
                {theme === "light" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Links */}
              <a
                href="https://github.com/mathdebate09/who-asked"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 lg:space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#f44336] dark:hover:text-[#ff5858] transition-colors"
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="hidden lg:inline">GitHub</span>
              </a>
              <a
                href="https://www.npmjs.com/package/who-asked"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 lg:space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#c33] dark:hover:text-[#ff5858] transition-colors"
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
                </svg>
                <span className="hidden lg:inline">NPM</span>
              </a>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700 space-y-3">
              <button
                onClick={toggleMode}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
              >
                {mode === "docs" ? (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Generator</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Docs</span>
                  </>
                )}
              </button>

              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-4 h-4" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>

              <div className="flex space-x-2">
                <a
                  href="https://github.com/mathdebate09/who-asked"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-[#f44336] dark:hover:text-[#ff5858] bg-gray-50 dark:bg-zinc-800 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.npmjs.com/package/who-asked"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-[#c33] dark:hover:text-[#ff5858] bg-gray-50 dark:bg-zinc-800 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
                  </svg>
                  <span>NPM</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">{mode === "docs" ? <DocsView /> : <GeneratorView />}</main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-zinc-700 mt-12 sm:mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
              Built with React, Vite & Tailwind CSS
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function DocsView() {
  const [copiedCommand, setCopiedCommand] = useState("")

  const handleCopyCommand = async (command) => {
    await navigator.clipboard.writeText(command)
    setCopiedCommand(command)
    setTimeout(() => setCopiedCommand(""), 2000)
  }

  return (
    <div className="space-y-8 sm:space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-4">
          <img src={logo || "/placeholder.svg"} alt="who-asked logo" className="w-12 h-12 sm:w-16 sm:h-16" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#ff5858] to-[#ffc8c8] bg-clip-text text-transparent">
            who-asked
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
          A chaotic, sarcastic library that gives you the response nobody asked for. Perfect for when you need that
          extra dose of digital sass in your life.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm px-4">
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full whitespace-nowrap">
            🎭 Meme Lib
          </span>
          <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full whitespace-nowrap">
            🎲 Randomized Generations
          </span>
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full whitespace-nowrap">
            🔥 Zero Dependencies
          </span>
        </div>
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center space-x-2">
          <span>📦</span>
          <span>Installation</span>
        </h2>
        <div className="space-y-3">
          <div
            className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-zinc-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
            onClick={() => handleCopyCommand("npm install who-asked")}
          >
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono text-[#f44336] dark:text-[#ff5858] break-all">
                npm install who-asked
              </code>
              <div className="ml-2 flex-shrink-0">
                {copiedCommand === "npm install who-asked" ? (
                  <Check className="w-4 h-4 light:text-gray-200 dark:text-gray-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>
          </div>
          <div
            className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-zinc-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
            onClick={() => handleCopyCommand("yarn add who-asked")}
          >
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono text-[#f44336] dark:text-[#ff5858] break-all">yarn add who-asked</code>
              <div className="ml-2 flex-shrink-0">
                {copiedCommand === "yarn add who-asked" ? (
                  <Check className="w-4 h-4 light:text-gray-200 dark:text-gray-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center space-x-2">
          <span>🚀</span>
          <span>Quick Start</span>
        </h2>
        <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-zinc-700 overflow-x-auto">
          <pre className="text-xs sm:text-sm font-mono text-gray-800 dark:text-gray-200">
            {`import { whoAsked } from 'who-asked'

// Get a random sarcastic text
const result = whoAsked('text')
console.log(result.text) // "404? Never heard of it"

// Get a random image with context
const image = whoAsked('image', ['meme', 'reaction'])
console.log(image.uri) // Returns image URL

// Get a random GIF
const gif = whoAsked('gif')
console.log(gif.uri) // Returns GIF URL`}
          </pre>
        </div>
      </section>

      {/* Function Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center space-x-2">
          <span>📚</span>
          <span>Function Reference</span>
        </h2>
        <div className="space-y-6">
          {/* Main Function */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-zinc-700 shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-[#f44336] dark:text-[#ff5858]">
              whoAsked(type, params?)
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
              The main function that returns a random response based on type.
            </p>
            <div className="bg-gray-50 dark:bg-zinc-900 rounded p-3 sm:p-4 mb-4 overflow-x-auto">
              <code className="text-xs sm:text-sm font-mono whitespace-nowrap">
                whoAsked('text' | 'image' | 'gif', params?: string[])
              </code>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <strong>type:</strong> 'text', 'image', or 'gif'
              </div>
              <div>
                <strong>params:</strong> Optional array of tags for filtering
              </div>
              <div>
                <strong>Returns:</strong> Object with text/uri and context
              </div>
            </div>
          </div>

          {/* Helper Functions */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Random Functions Column */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center space-x-2">
                <span>🎲</span>
                <span>Random Functions</span>
              </h4>
              <div className="space-y-4">
                <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-zinc-700">
                  <h5 className="font-semibold text-[#c33] dark:text-[#ff5858] mb-2">getRandomText()</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Returns a random who-asked text</p>
                  <code className="text-xs bg-gray-100 dark:bg-zinc-900 px-2 py-1 rounded break-all">
                    {"{ text: string, context: string[] }"}
                  </code>
                </div>
                <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-zinc-700">
                  <h5 className="font-semibold text-[#c33] dark:text-[#ff5858] mb-2">getRandomImage()</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Returns a random who-asked image</p>
                  <code className="text-xs bg-gray-100 dark:bg-zinc-900 px-2 py-1 rounded break-all">
                    {"{ uri, tags, height, width, type }"}
                  </code>
                </div>
                <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-zinc-700">
                  <h5 className="font-semibold text-[#c33] dark:text-[#ff5858] mb-2">getRandomGif()</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Returns a random who-asked GIF</p>
                  <code className="text-xs bg-gray-100 dark:bg-zinc-900 px-2 py-1 rounded break-all">
                    {"{ uri, tags, height, width, type }"}
                  </code>
                </div>
              </div>
            </div>

            {/* Regular Functions Column */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center space-x-2">
                <span>🎯</span>
                <span>Filtered Functions</span>
              </h4>
              <div className="space-y-4">
                <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-zinc-700">
                  <h5 className="font-semibold text-[#c33] dark:text-[#ff5858] mb-2">text(params)</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tag-filtered text responses</p>
                  <code className="text-xs bg-gray-100 dark:bg-zinc-900 px-2 py-1 rounded break-all">
                    text(['sarcasm', 'roast'])
                  </code>
                </div>
                <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-zinc-700">
                  <h5 className="font-semibold text-[#c33] dark:text-[#ff5858] mb-2">image(params)</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tag-filtered image responses</p>
                  <code className="text-xs bg-gray-100 dark:bg-zinc-900 px-2 py-1 rounded break-all">
                    image(['meme', 'reaction'])
                  </code>
                </div>
                <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-zinc-700">
                  <h5 className="font-semibold text-[#c33] dark:text-[#ff5858] mb-2">gif(params)</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tag-filtered GIF responses</p>
                  <code className="text-xs bg-gray-100 dark:bg-zinc-900 px-2 py-1 rounded break-all">
                    gif(['zoom', 'dramatic'])
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center space-x-2">
          <span>💡</span>
          <span>Usage Examples</span>
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-zinc-700">
            <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Basic Usage</h3>
            <div className="overflow-x-auto">
              <pre className="text-xs sm:text-sm font-mono text-gray-700 dark:text-gray-300">
                {`import { whoAsked, getRandomText } from 'who-asked'

// Simple random text
const response = getRandomText()
console.log(response.text) // "Nobody asked, but okay..."

// Filtered by tags
const errorpage = whoAsked('text', ['404'])
console.log(errorpage.text) // "Paging... paging anyone who asked... The line seems to be dead."`}
              </pre>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-zinc-700">
            <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">React Integration</h3>
            <div className="overflow-x-auto">
              <pre className="text-xs sm:text-sm font-mono text-gray-700 dark:text-gray-300">
                {`import { useState } from 'react'
import { whoAsked } from 'who-asked'

function SassyComponent() {
  const [response, setResponse] = useState('')
  
  const handleClick = () => {
    const result = whoAsked('text', ['sarcasm'])
    setResponse(result.text)
  }
  
  return (
    <div>
      <button onClick={handleClick}>Get Sassy</button>
      <p>{response}</p>
    </div>
  )
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function GeneratorView() {
  const [type, setType] = useState("text")
  const [tags, setTags] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    setResult(null)
    setCopied(false)
    const params = tags.trim() ? tags.split(",").map((tag) => tag.trim()) : undefined
    const generatedResult = whoAsked(type, params)
    setResult(generatedResult)
    setLoading(false)
  }

  const handleCopy = async () => {
    if (!result) return
    const textToCopy = result.text || result.uri || ""
    await navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-4">
          <img src={logo || "/placeholder.svg"} alt="who-asked logo" className="w-10 h-10 sm:w-12 sm:h-12" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#ff5858] to-[#ffc8c8] bg-clip-text text-transparent">
            Random Generator
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
          Generate random sarcastic responses, memes, and GIFs. Because sometimes you need the perfect comeback.
        </p>
      </div>

      {/* Generator Controls */}
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-zinc-700 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Generator Settings</h2>

          {/* Type Selector */}
          <div className="space-y-3 mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Response Type</label>
            <div className="grid grid-cols-3 gap-2 sm:flex sm:space-x-4 sm:gap-0">
              {["text", "image", "gif"].map((option) => (
                <button
                  key={option}
                  onClick={() => setType(option)}
                  className={`px-3 sm:px-4 py-2 rounded-lg border transition-colors text-sm sm:text-base ${
                    type === option
                      ? "bg-[#f44336] text-white border-[#f44336]"
                      : "bg-gray-50 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-zinc-600 hover:bg-gray-100 dark:hover:bg-zinc-600"
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Input */}
          <div className="space-y-3 mb-6">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tags (optional)
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="sarcasm, roast, meme (comma-separated)"
              className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#f44336] focus:border-transparent text-sm sm:text-base"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Add tags to filter results. Leave empty for completely random responses.
            </p>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#ff5858] to-[#ffc8c8] text-white font-semibold py-3 px-6 rounded-lg hover:from-[#f44336] hover:to-[#ff5858] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Generate Random {type.charAt(0).toUpperCase() + type.slice(1)}</span>
                <span className="sm:hidden">Generate {type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-zinc-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Generated Result</h3>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 px-3 py-1 text-sm bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            {/* Text Result */}
            {result.text && (
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-[#ff5858]/10 to-[#ffc8c8]/10 rounded-lg p-4 border border-[#ff5858]/20">
                  <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 font-medium">{result.text}</p>
                </div>
              </div>
            )}

            {/* Image/GIF Result */}
            {result.uri && (
              <div className="space-y-3">
                <div className="bg-gray-50 dark:bg-zinc-700 rounded-lg p-4 text-center">
                  <div className="mb-3">
                    <img
                      src={result.uri || "/placeholder.svg"}
                      alt={`Generated ${type}`}
                      className="max-w-full h-auto rounded-lg mx-auto"
                      style={{
                        maxHeight: "300px",
                        width: result.width ? `${Math.min(result.width, 400)}px` : "auto",
                        height: result.height ? `${Math.min(result.height, 300)}px` : "auto",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none"
                        e.target.nextSibling.style.display = "flex"
                      }}
                      onLoad={(e) => {
                        e.target.style.display = "block"
                        e.target.nextSibling.style.display = "none"
                      }}
                    />
                    <div
                      className="bg-gray-200 dark:bg-zinc-600 rounded-lg h-48 flex items-center justify-center"
                      style={{ display: "none" }}
                    >
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {type === "gif" ? "🎬 GIF Preview" : "🖼️ Image Preview"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-mono break-all">
                    {result.uri}
                  </p>
                  {(result.width || result.height) && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Dimensions: {result.width}x{result.height}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Context Tags */}
            {result.context && result.context.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Context Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {result.context.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#f44336]/10 text-[#f44336] dark:bg-[#ff5858]/20 dark:text-[#ff5858] text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Usage Hint */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
          <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 flex items-center space-x-2">
            <span>💡</span>
            <span>Pro Tip</span>
          </h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm">
            Try different tag combinations like "sarcasm, roast" for text, "meme, reaction" for images, or "dramatic,
            zoom" for GIFs. The more specific your tags, the more targeted your sass!
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
