/**
 * CLAUDE MEMORY SYNC SYSTEM
 *
 * A simple, efficient file-based memory system inspired by Anthropic's approach.
 * No vector databases, no embeddings - just plain markdown files and context.
 *
 * Core Philosophy:
 * - Memory is stored in simple .md files
 * - Entire memory loaded into context (leveraging large context windows)
 * - 6 fundamental operations: view, create, str_replace, insert, delete, rename
 * - Client-side storage (developer controls backend)
 */

class MemorySystem {
  constructor(storageBackend = 'localStorage') {
    this.storageBackend = storageBackend;
    this.memoryFiles = new Map();
    this.sessionId = this.generateSessionId();
    this.initializeStorage();
  }

  /**
   * Generate unique session ID
   */
  generateSessionId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `session_${timestamp}_${random}`;
  }

  /**
   * Initialize storage and load existing memories
   */
  initializeStorage() {
    if (this.storageBackend === 'localStorage' && typeof localStorage !== 'undefined') {
      // Load all memory files from localStorage
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('memory:')) {
          const fileName = key.replace('memory:', '');
          const content = localStorage.getItem(key);
          this.memoryFiles.set(fileName, content);
        }
      });
    }
    console.log(`[MemorySystem] Initialized with ${this.memoryFiles.size} memory files`);
  }

  /**
   * OPERATION 1: VIEW
   * Read memory file contents
   */
  view(fileName = 'CLAUDE.md') {
    const content = this.memoryFiles.get(fileName);
    if (!content) {
      return {
        success: false,
        error: `Memory file '${fileName}' not found`,
        content: null
      };
    }
    return {
      success: true,
      fileName,
      content,
      size: content.length,
      lines: content.split('\n').length
    };
  }

  /**
   * OPERATION 2: CREATE
   * Create new memory file with content
   */
  create(fileName, content, metadata = {}) {
    if (this.memoryFiles.has(fileName)) {
      return {
        success: false,
        error: `Memory file '${fileName}' already exists. Use update instead.`
      };
    }

    // Add metadata header
    const header = this.generateMemoryHeader(fileName, metadata);
    const fullContent = `${header}\n\n${content}`;

    this.memoryFiles.set(fileName, fullContent);
    this.persistToStorage(fileName, fullContent);

    return {
      success: true,
      fileName,
      size: fullContent.length,
      message: `Created memory file: ${fileName}`
    };
  }

  /**
   * OPERATION 3: STR_REPLACE
   * Replace exact string match in memory file
   */
  str_replace(fileName, oldString, newString) {
    const current = this.memoryFiles.get(fileName);
    if (!current) {
      return {
        success: false,
        error: `Memory file '${fileName}' not found`
      };
    }

    if (!current.includes(oldString)) {
      return {
        success: false,
        error: 'Old string not found in memory file',
        hint: 'Make sure the old string matches exactly'
      };
    }

    const updated = current.replace(oldString, newString);
    this.memoryFiles.set(fileName, updated);
    this.persistToStorage(fileName, updated);

    return {
      success: true,
      fileName,
      operation: 'str_replace',
      message: `Updated memory in ${fileName}`
    };
  }

  /**
   * OPERATION 4: INSERT
   * Insert content at specific location (line-based)
   */
  insert(fileName, lineNumber, content) {
    const current = this.memoryFiles.get(fileName);
    if (!current) {
      return {
        success: false,
        error: `Memory file '${fileName}' not found`
      };
    }

    const lines = current.split('\n');
    if (lineNumber < 0 || lineNumber > lines.length) {
      return {
        success: false,
        error: `Invalid line number: ${lineNumber}`
      };
    }

    lines.splice(lineNumber, 0, content);
    const updated = lines.join('\n');
    this.memoryFiles.set(fileName, updated);
    this.persistToStorage(fileName, updated);

    return {
      success: true,
      fileName,
      operation: 'insert',
      lineNumber,
      message: `Inserted content at line ${lineNumber}`
    };
  }

  /**
   * OPERATION 5: DELETE
   * Delete entire memory file
   */
  delete(fileName) {
    if (!this.memoryFiles.has(fileName)) {
      return {
        success: false,
        error: `Memory file '${fileName}' not found`
      };
    }

    this.memoryFiles.delete(fileName);

    // Remove from persistent storage
    if (this.storageBackend === 'localStorage' && typeof localStorage !== 'undefined') {
      localStorage.removeItem(`memory:${fileName}`);
    }

    return {
      success: true,
      fileName,
      operation: 'delete',
      message: `Deleted memory file: ${fileName}`
    };
  }

  /**
   * OPERATION 6: RENAME
   * Rename memory file
   */
  rename(oldFileName, newFileName) {
    const content = this.memoryFiles.get(oldFileName);
    if (!content) {
      return {
        success: false,
        error: `Memory file '${oldFileName}' not found`
      };
    }

    if (this.memoryFiles.has(newFileName)) {
      return {
        success: false,
        error: `Target file '${newFileName}' already exists`
      };
    }

    // Update memory reference in content
    const updated = content.replace(
      `# Memory File: ${oldFileName}`,
      `# Memory File: ${newFileName}`
    );

    this.memoryFiles.delete(oldFileName);
    this.memoryFiles.set(newFileName, updated);

    // Update persistent storage
    if (this.storageBackend === 'localStorage' && typeof localStorage !== 'undefined') {
      localStorage.removeItem(`memory:${oldFileName}`);
      localStorage.setItem(`memory:${newFileName}`, updated);
    }

    return {
      success: true,
      oldFileName,
      newFileName,
      operation: 'rename',
      message: `Renamed ${oldFileName} to ${newFileName}`
    };
  }

  /**
   * Get all memory as a single context string (for loading into Claude)
   */
  getFullMemoryContext() {
    const files = Array.from(this.memoryFiles.entries());
    if (files.length === 0) {
      return '# No Memory Files\n\nNo memories have been stored yet.';
    }

    const sections = files.map(([fileName, content]) => {
      return `# === Memory File: ${fileName} ===\n\n${content}`;
    });

    return sections.join('\n\n---\n\n');
  }

  /**
   * List all memory files
   */
  list() {
    const files = Array.from(this.memoryFiles.entries()).map(([name, content]) => ({
      name,
      size: content.length,
      lines: content.split('\n').length,
      lastModified: this.extractLastModified(content)
    }));

    return {
      success: true,
      count: files.length,
      files
    };
  }

  /**
   * Search memory content
   */
  search(query) {
    const results = [];

    this.memoryFiles.forEach((content, fileName) => {
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            fileName,
            lineNumber: index + 1,
            line: line.trim(),
            context: this.getLineContext(lines, index)
          });
        }
      });
    });

    return {
      success: true,
      query,
      count: results.length,
      results
    };
  }

  /**
   * Sync memory to remote backend (placeholder for future implementation)
   */
  async syncToRemote(remoteUrl) {
    // This would implement actual network sync
    // For now, just simulate it
    return {
      success: true,
      message: 'Memory sync not yet implemented for remote backends',
      sessionId: this.sessionId,
      filesCount: this.memoryFiles.size
    };
  }

  // === HELPER METHODS ===

  generateMemoryHeader(fileName, metadata) {
    const timestamp = new Date().toISOString();
    return `# Memory File: ${fileName}
Created: ${timestamp}
Session: ${this.sessionId}
${Object.entries(metadata).map(([k, v]) => `${k}: ${v}`).join('\n')}`;
  }

  persistToStorage(fileName, content) {
    if (this.storageBackend === 'localStorage' && typeof localStorage !== 'undefined') {
      localStorage.setItem(`memory:${fileName}`, content);
    }
  }

  extractLastModified(content) {
    const match = content.match(/Created: (.+)/);
    return match ? match[1] : 'Unknown';
  }

  getLineContext(lines, index, contextLines = 2) {
    const start = Math.max(0, index - contextLines);
    const end = Math.min(lines.length, index + contextLines + 1);
    return lines.slice(start, end).join('\n');
  }

  /**
   * Export memory as JSON
   */
  exportAsJson() {
    return {
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      files: Array.from(this.memoryFiles.entries()).map(([name, content]) => ({
        name,
        content
      }))
    };
  }

  /**
   * Import memory from JSON
   */
  importFromJson(jsonData) {
    if (!jsonData.files || !Array.isArray(jsonData.files)) {
      return {
        success: false,
        error: 'Invalid JSON format'
      };
    }

    let imported = 0;
    jsonData.files.forEach(({ name, content }) => {
      this.memoryFiles.set(name, content);
      this.persistToStorage(name, content);
      imported++;
    });

    return {
      success: true,
      imported,
      message: `Imported ${imported} memory files`
    };
  }
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MemorySystem;
}
