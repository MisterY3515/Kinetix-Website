App.changelog = [
    {
        version: "v0.0.9 (35)",
        date: "2026-03-07",
        changes: [
            "<b>Compiler Optimization Passes (Bytecode):</b> Added <code>opt.rs</code> implementation for dead code elimination, constant folding, constant propagation, redundant load elimination, Nop elimination, jump threading, and copy elision 2.0. Reduces KiVM instruction footprint.",
            "<b>MIR Optimization Passes:</b> Added <code>mir_opt.rs</code> for Control Flow Simplification (merge single-pred blocks, remove empty Goto blocks) and Drop Redundancy cleanup.",
            "<b>Extended Linker (.exki v2):</b> The bundle linker now supports the Extended Format <code>kivm-bytecode-v2</code> which embeds an <code>optimized</code> manifest flag and compile version tracking for runtime awareness.",
            "<b>Metrics Tracker & CLI Flags:</b> Introduced <code>--metrics</code> flag to track instruction count delta and execution time. Introduced <code>--no-opt</code> to bypass bytecode passes completely."
        ]
    },
    {
        version: "v0.0.9 (34)",
        date: "2026-03-06",
        changes: [
            "<b>LSP Server (HM-powered):</b> Integrated a full Language Server Protocol server into <code>kicomp</code> (<code>lsp.rs</code>). Handles JSON-RPC messages via stdin/stdout for real-time editor integration.",
            "<b>Real-Time Diagnostics:</b> The LSP performs Lexer, Parser, Symbol Resolution and HM Type Checking on every <code>textDocument/didChange</code> event, publishing <code>textDocument/publishDiagnostics</code> with syntax and semantic errors.",
            "<b>CLI Integration:</b> Added <code>kivm lsp</code> subcommand to start the LSP server, enabling direct integration with VS Code, Neovim, and other LSP-compatible editors.",
            "<b>Documentation Refresh:</b> Updated <code>docs.md</code>, <code>cli.js</code>, and internal function documentation to reflect Build 33 features (.kicomp system, init/build/start commands, Package Manager)."
        ]
    },
    {
        version: "v0.0.9 (33)",
        date: "2026-03-05",
        changes: [
            "<b>.kicomp Project System:</b> Implemented the full <code>.kicomp</code> project file parser (<code>project.rs</code>). Supports project metadata (name, version, author), entry point, output target (kivm/native), optimization level, dependencies, and sandbox permissions.",
            "<b>Offline Package Manager:</b> Added dependency resolver (<code>resolver.rs</code>) with topological sort, cycle detection, and local path dependency support. Modules are combined into a single compilation unit.",
            "<b>New CLI Commands:</b> <code>kivm init</code> scaffolds a new project (project.kicomp + src/main.kix). <code>kivm build</code> compiles a project. <code>kivm start</code> compiles and runs a project.",
            "<b>Sandbox-Driven Capabilities:</b> The <code>CapabilityValidator</code> now derives permissions from the <code>sandbox</code> section of .kicomp files instead of hardcoding all capabilities. Dev mode (<code>kivm exec</code>) retains full access for backward compatibility."
        ]
    },
    {
        version: "v0.0.9 (32)",
        date: "2026-03-04",
        changes: [
            "<b>Filesystem Directories (<code>data.dir.*</code>):</b> Implemented namespace supporting tree manipulations: <code>data.dir.list</code>, <code>data.dir.create</code> and <code>data.dir.delete</code>.",
            "<b>Path Safety & Utilities (<code>data.path.*</code>):</b> Provided static normalization functions (`data.path.normalize`) and Sandbox introspection capability (`data.path.isSafe`), empowering code awareness before native OS interaction.",
            "<b>Experimental File Watcher:</b> Structural stub implementation of <code>data.watch</code> polling integration.",
            "<b>Extended Capabilities:</b> CapabilityValidator enforces rigorous <code>FsRead</code> and <code>FsWrite</code> checking on the entire newly imported <code>data.dir</code> surface."
        ]
    },
    {
        version: "v0.0.9 (31)",
        date: "2026-03-04",
        changes: [
            "<b>Filesystem Core (<code>data.file.*</code>):</b> Implemented a robust and ownership-safe file I/O module. Added <code>data.file.read</code>, <code>data.file.write</code>, <code>data.file.exists</code>, <code>data.file.delete</code>, <code>data.file.copy</code>, and <code>data.file.move</code> methods for native file manipulation.",
            "<b>Path Traversal Guard:</b> Embedded a strict security layer inside the Kinetix VM. All <code>data.file.*</code> routines automatically sanitize inputs, blocking access outside the working directory boundaries and preventing explicit tree traversal (like <code>../</code>) to prevent unauthorized environment breaches.",
            "<b>Capability Sandbox Update:</b> Extended the compiler's <code>CapabilityValidator</code> to mandate the <code>FsRead</code> capability for non-destructive accesses, and <code>FsWrite</code> capability for mutable, destructive file manipulations like <code>delete</code> and <code>write</code>.",
            "<b>Structured Return Types:</b> All file operations securely return functional maps (<code>{ok: data}</code> or <code>{err: string}</code>) instead of unwieldy panics, ensuring process safety upon missing files or permission denials."
        ]
    },
    {
        version: "v0.0.9 (30)",
        date: "2026-03-04",
        changes: [
            "<b>Network Ping Utility:</b> Implemented <code>net.ping(address, timeout)</code> — a TCP connectivity probe that measures round-trip time in milliseconds. Uses port 80 with configurable timeout, safe for unprivileged execution (no raw ICMP required).",
            "<b>Interface Enumeration:</b> Added <code>net.getInterfaces()</code> which returns a list of network interface maps (<code>{name, addr}</code>). Cross-platform: parses <code>ipconfig</code> (Windows), <code>ip -o -4 addr show</code> (Linux), and <code>ifconfig</code> (macOS). Locale-aware (supports Italian <code>Indirizzo IPv4</code>).",
            "<b>TLS Stub:</b> Introduced <code>net.tls.connect(addr, port)</code> structural placeholder. Full TLS socket support planned for a future build; HTTPS connectivity already available via <code>net.http.get/post</code>.",
            "<b>Capability Sandbox:</b> Extended <code>CapabilityValidator</code> to enforce <code>NetAccess</code> on <code>net.ping</code>, <code>net.getInterfaces</code>, and <code>net.tls.*</code> at compile-time.",
            "<b>RTF File Guard:</b> The CLI now detects Rich Text Format files masquerading as <code>.kix</code> source (common on macOS with TextEdit) and provides a clear error message instead of cryptic parse failures.",
            "<b>macOS Installer Fix:</b> <code>kivm repair</code> and <code>kivm uninstall</code> now correctly locate the installer binary on macOS/Linux (<code>KinetixInstaller</code> instead of <code>installer.exe</code>)."
        ]
    },
    {
        version: "v0.0.9 (29)",
        date: "2026-03-03",
        changes: [
            "<b>HTTP Networking Core:</b> Introduced <code>net.http.get(url)</code> and <code>net.http.post(url, payload)</code> returning comprehensive <code>Result&lt;Response, E&gt;</code> generic types. Methods are structurally integrated with internal <code>reqwest</code> endpoints without blocking.",
            "<b>HTTP Client Enhancements:</b> Supported fine-grained network controls via <code>net.http.setHeader(key, value)</code> and <code>net.http.setTimeout(ms)</code> for customized communication contexts.",
            "<b>Asynchronous Execution Engine (Async Net):</b> Deployed the `Future` evaluation model on Kinetix via <code>net.async.*</code> surface. Exposed <code>net.async.tcp.connect</code>, <code>net.async.http.get/post</code> to yield polling <code>Future&lt;T&gt;</code> objects.",
            "<b>Event Polling and Scheduling:</b> Implemented <code>net.async.select(futures_list)</code> to poll unresolved connection pools natively in linear time, guaranteeing zero-blocking threaded evaluations in script loops.",
            "<b>Futures Ownership Pass:</b> Hardened the Borrow Checker to manage Future drops correctly, effectively eliminating hanging async TCP descriptors on early scopes exits."
        ]
    },
    {
        version: "v0.0.9 (28)",
        date: "2026-03-03",
        changes: [
            "<b>TCP Networking Core:</b> Implemented <code>net.tcp.connect</code>, <code>net.tcp.listen</code>, <code>net.tcp.accept</code>, <code>net.tcp.send</code>, <code>net.tcp.recv</code>, <code>net.tcp.recvLine</code>. Connections are managed via a Global Connection Registry with linear IDs — no raw pointers are exposed to the language layer.",
            "<b>TCP Options:</b> Added <code>net.tcp.setTimeout</code>, <code>net.tcp.setNoDelay</code>, <code>net.tcp.shutdown</code>, <code>net.tcp.close</code>, <code>net.tcp.localAddr</code>, <code>net.tcp.peerAddr</code>.",
            "<b>UDP Datagram Module:</b> Implemented <code>net.udp.bind</code>, <code>net.udp.send</code>, <code>net.udp.recv</code>, <code>net.udp.setTimeout</code>, <code>net.udp.close</code>. Stateless datagram handling with ownership-safe socket registry.",
            "<b>HTTP Improvements:</b> Existing <code>net.get</code>/<code>net.post</code> now return structured <code>Result&lt;T,E&gt;</code> maps with <code>status</code> codes. Added <code>net.resolve</code> for DNS lookup.",
            "<b>Capability Sandbox:</b> Extended <code>CapabilityValidator</code> to enforce <code>NetAccess</code> capability on all <code>net.tcp.*</code>, <code>net.udp.*</code>, and <code>net.http.*</code> syscalls at compile-time."
        ]
    },
    {
        version: "v0.0.8 (27)",
        date: "2026-03-02",
        changes: [
            "<b>Holy-Shell Syntax:</b> Introduced optional parentheses for function calls (e.g., <code>print \"Hello\"</code>, <code>let x = len [1, 2, 3]</code>). The parser now intelligently handles space-separated arguments without ambiguity, streamlining shell-like scripts.",
            "<b>Backticks Operator:</b> Added native support for backtick strings (e.g., <code>`ls -la`</code>). The compiler seamlessly desugars these into <code>system.exec(\"ls -la\")</code> calls, governed by the Capability Sandbox.",
            "<b>Parser Intelligence:</b> Resolved complex LL(1) ambiguities between list literals and index expressions by implementing space-tracking within the Lexer, ensuring robust structural parsing."
        ]
    },
    {
        version: "v0.0.8 (26)",
        date: "2026-03-01",
        changes: [
            "<b>system.defer() RAII Implementation:</b> Fully implemented <code>system.defer(fn)</code> with LIFO (last-in, first-out) execution ordering. Deferred closures are stored per-<code>CallFrame</code> and fire automatically when the function scope exits, mirroring Rust's <code>Drop</code> and Go's <code>defer</code> semantics.",
            "<b>Syscall Isolation Audit:</b> Extended the <code>CapabilityValidator</code> to cover all remaining BUILTIN_NAMES endpoints: <code>env.get</code>, <code>env.set</code>, <code>env.args</code>, <code>System.time</code>, <code>time.now</code>, <code>time.ticks</code>, <code>time.sleep</code>. The compile-time sandbox now has 100% coverage over the entire syscall surface.",
            "<b>Static Syscall Map:</b> Added <code>static_syscall_map()</code> public function in <code>capability.rs</code> exporting all syscall→capability mappings for documentation and tooling."
        ]
    },
    {
        version: "v0.0.8 (25)",
        date: "2026-03-01",
        changes: [
            "<b>Ownership-Safe Native Threading:</b> Successfully implemented <code>system.thread.spawn</code> and <code>system.thread.join</code>. Threads are now backed natively by the Rust <code>std::thread</code> model. Kinetix utilizes a Global Lazy Thread Registry to map linear IDs to raw <code>JoinHandle</code>s without exposing native pointers.",
            "<b>Deep Graph Value Climbing:</b> Thanks to Kinetix's functional variable architecture, any parameters passed to a spawned thread are intrinsically deep-copied without any shared reference counts (e.g., no <code>Rc</code> or <code>RefCell</code> wrapping collections). This completely eradicates cross-thread data aliasing natively.",
            "<b>Multi-VM Isolation:</b> Every thread executes within its newly initialized independent <code>VM</code>, sharing only a cloned reference to the compiled multi-block Program bytecode."
        ]
    },
    {
        version: "v0.0.8 (24)",
        date: "2026-03-01",
        changes: [
            "<b>Capability Validator — Full Syscall Coverage:</b> Extended the compile-time <code>CapabilityValidator</code> sandbox pass to enforce capability checks on all Build 23 OS Abstraction Layer functions. New <code>ThreadControl</code> capability gates <code>system.thread.spawn/join/sleep</code> and <code>system.defer</code>.",
            "<b>Flattened Call Interception:</b> The validator now intercepts multi-level global function calls (<code>system.os.name</code>, <code>system.exec</code>, etc.) that the HIR flattens into direct <code>Identifier</code> calls, closing the sandbox gap for all <code>system.*</code> endpoints.",
            "<b>OsExecute Gate:</b> <code>system.exec()</code> now requires the <code>OsExecute</code> capability. Programs without this grant are rejected at compile-time.",
            "<b>SysInfo Gate:</b> <code>system.os.name()</code>, <code>system.os.arch()</code>, and all <code>system.os.is*()</code> detection calls now require the <code>SysInfo</code> capability."
        ]
    },
    {
        version: "v0.0.8 (23)",
        date: "2026-03-01",
        changes: [
            "<b>Self as Linear Value:</b> Enforced explicit moves for <code>self</code> in consuming methods within MIR, guaranteeing safe component destruction in UI paradigms.",
            "<b>SSA Reactive Integrity:</b> Formally verified through <code>ssa_validate.rs</code> that declarative reactive nodes (State/Computed/Effect) are structurally isolated from the canonical SSA graph.",
            "<b>Performance Optimizations:</b> Implemented <code>RefCell</code> caching for Trait Resolution to bypass duplicate lookups, ensuring O(1) checks during type normalization.",
            "<b>Phase 3 Final Closure:</b> Finalized the OOP & Reactive Engine milestones for version 0.0.7.",
            "<b>OS Detection Runtime:</b> Added <code>system.os.isWindows()</code>, <code>system.os.isLinux()</code>, and <code>system.os.isMac()</code> built-in functions that return the host OS at runtime via Rust <code>cfg!</code> macros.",
            "<b>Multi-Level MemberAccess:</b> The bytecode compiler (<code>compiler.rs</code>) now supports multi-level dot-access chains (e.g. <code>system.os.isWindows()</code>) for built-in module calls, flattening them into a single global function name.",
            "<b>Compile-Time OS Branch Elimination:</b> The HIR lowering phase (<code>hir.rs</code>) now performs constant folding on <code>if system.os.is*()</code> conditions, statically eliminating dead OS-specific branches before MIR generation.",
            "<b>MIR Pipeline Fix:</b> Resolved persistent <code>mir.rs:399</code> panic caused by unresolved <code>MethodCall</code> nodes reaching MIR. Built-in module calls are now correctly flattened to <code>Call</code> expressions in both HIR lowering and Type Normalization passes.",
            "<b>Static VTable OOP Dispatch:</b> Implemented a compile-time static <code>VTable</code> builder executed after monomorphization. Replaced the runtime <code>LoadMethod</code> loop traversing string IDs with a direct, O(1) constant index lookup to bound method execution mapping.",
            "<b>Zero-Panic OS Abstraction Layer:</b> Vastly expanded the <code>system.</code> namespace introducing <code>system.os.name()</code>, <code>system.os.arch()</code>, <code>system.exec()</code>, <code>system.thread.sleep()</code>. All OS endpoints are guaranteed panic-free, safely surfacing OS-level exceptions through the Kinetix <code>Result&lt;T,E&gt;</code> generic enumeration."
        ]
    },
    {
        version: "v0.0.7 (22)",
        date: "2026-02-28",
        changes: [
            "<b>Self as Linear Value:</b> Enforced explicit moves for <code>self</code> in consuming methods within MIR, guaranteeing safe component destruction in UI paradigms.",
            "<b>SSA Reactive Integrity:</b> Formally verified through <code>ssa_validate.rs</code> that declarative reactive nodes (State/Computed/Effect) are structurally isolated from the canonical SSA graph.",
            "<b>Performance Optimizations:</b> Implemented <code>RefCell</code> caching for Trait Resolution to bypass duplicate lookups, ensuring O(1) checks during type normalization.",
            "<b>Phase 3 Final Closure:</b> Finalized the OOP & Reactive Engine milestones for version 0.0.7."
        ]
    },
    {
        version: "v0.0.7 (21)",
        date: "2026-02-28",
        changes: [
            "<b>Safe Default Initialization:</b> Variables declared with a type hint but no explicit value (<code>let x: int;</code>) are now automatically initialized to their type's zero-value (0, false, \"\"). This prevents uninitialized-variable bugs at the parser level.",
            "<b>Global Allocation Audit:</b> The KiVM runtime now tracks all heap allocations (strings, arrays, maps, ranges, class instances) via a new <code>MemoryStats</code> struct. Use <code>--audit</code> flag to print the allocation report after execution.",
            "<b>Formal Invariants Certification:</b> When the <code>--audit</code> flag is passed, the compiler prints <code>[✓] Formal Invariants Certified</code> after all Build 17-20 validation passes complete successfully.",
            "<b>Phase 3 Test Suite:</b> Added <code>tests/phase3_oop.kix</code> covering default initialization, struct creation with field access, string concatenation, arrays, and reactive state/computed/effect."
        ]
    },
    {
        version: "v0.0.7 (20)",
        date: "2026-02-28",
        changes: [
            "<b>HIR Integrity Validation:</b> Added structural checking pass `hir_validate` to verify duplicate function parameters and detect unreachable statements after `return`, `break`, or `continue`.",
            "<b>MIR/SSA Integrity Enhancements:</b> Upgraded `ssa_validate` to perform robust use-before-assign protection for all operands, verify terminator integrity including valid `Return` generation, and detect orphan/unreachable blocks.",
            "<b>Deterministic Layout Hashing:</b> Extended the custom FNV-1a structural hashing algorithm completely into the High-level IR via `hash_hir_program`, cementing build stabilization.",
            "<b>Pipeline Integration:</b> Firmly wired the full validation suite into both compilation sequences (`Exec` / `Compile`), ensuring all executables fulfill strict compiler rules before LLVM code generation."
        ]
    },
    {
        version: "v0.0.7 (19)",
        date: "2026-02-28",
        changes: [
            "<b>Panic Removal (kivm):</b> Replaced lethal unwraps on mutex locks in `system.rs` and JSON parsers in `data.rs` with safe `Result<T, Err>` propagations to prevent runtime crashes.",
            "<b>Compile-Time Result Enforcement:</b> The compiler (kicomp) now intercepts fallible built-in invocations (like `data.read_text`, `net.get`) and statically constraints their return type to `Result<T, String>`, preventing blind assignments and throwing a `Type Mismatch` if error paths are unhandled.",
            "<b>Capability IR and Sandbox Pass:</b> Added a new post-HIR compiler pass (`CapabilityValidator`) that checks for explicit system permissions (`FsRead`, `FsWrite`, `NetAccess`, `SysInfo`). Kinetix Scripts lacking credentials for protected OS syscalls will be immediately rejected at compile-time."
        ]
    },
    {
        version: "v0.0.7 (18)",
        date: "2026-02-28",
        changes: [
            "<b>OOP Method Resolving Pass:</b> Added a post-TypeChecker static dispatch pass (<code>resolve_method_calls</code>) that transforms instance method calls into static class calls with <code>&mut self</code> injection.",
            "<b>VM OOP Runtime Dispatch:</b> Implemented <code>Opcode::LoadMethod</code> to resolve methods dynamically on the Virtual Machine via a hidden <code>__class__</code> field on struct allocations.",
            "<b>Deterministic IR Hashing:</b> Replaced Rust's default randomized Hasher with a custom 64-bit FNV-1a <code>DeterministicHasher</code> for MIR nodes and Types, guaranteeing cross-compilation stability.",
            "<b>Monomorphization Limits (DOS Guard):</b> Added an explicit bounds checker capping generic instantiations (<code>MAX_INSTANTIATIONS = 2048</code>) to prevent combinatorial explosion compile-time attacks.",
            "<b>Compile-Time Regression Guard:</b> Extended the test suite with a strict performance constraint, ensuring that HM Inference and Monomorphization scaling remains strictly O(n) under 500ms."
        ]
    },
    {
        version: "v0.0.7 (17)",
        date: "2026-02-26",
        changes: [
            "<b>Reactive Core AST:</b> Introduced <code>state</code>, <code>computed</code>, and <code>effect</code> reserved keywords to the Lexer, Parser and full AST. State variables are implicitly mutable; Computed values are immutable. Effects declare reactive side-effect blocks with explicit dependency lists.",
            "<b>Reactive Dependency Graph:</b> New <code>reactive.rs</code> module with static dependency resolution. Builds a DAG from <code>state</code>→<code>computed</code> references via HIR traversal. Topological sort (Kahn's algorithm) produces deterministic update order. Cycle detection enabled at compile-time.",
            "<b>Reactive VM Frame Scheduler:</b> Implemented the Single-Threaded Tick Engine inside KiVM. The VM identifies <code>SetState</code> and <code>UpdateState</code> mutations and triggers an internal Frame Replay without Garbage Collection overhead.",
            "<b>Reactive Bytecode Lowering:</b> <code>state</code>, <code>computed</code>, and <code>effect</code> statements now compile to dedicated VM bytecode. Computed values are wrapped in anonymous closure functions. Effect bodies are compiled as thunk closures with dependency arrays.",
            "<b>New Reactive Opcodes:</b> Added <code>SetState</code>, <code>UpdateState</code>, <code>InitComputed</code>, and <code>InitEffect</code> (opcode 47) to the instruction set.",
            "<b>HIR Exhaustiveness Extension:</b> The exhaustiveness checker (<code>exhaustiveness.rs</code>) now traverses <code>State</code>, <code>Computed</code>, and <code>Effect</code> nodes when validating pattern coverage in nested match expressions.",
            "<b>Type Normalization Extension:</b> The type normalization pass now correctly walks through reactive statement nodes, normalizing inner expression and body types.",
            "<b>Struct Instantiation Benchmark (O(n)):</b> Passed 10,000 sequenced struct allocation stress tests under <code>40ms</code> verifying no exponential compilation deterioration.",
            "<b>Compiler Pipeline Cleanup:</b> Removed duplicate match arms for <code>State</code>/<code>Computed</code> in <code>compiler.rs</code> and <code>hir.rs</code>. Fixed <code>benchmarks.rs</code> compile signature after reactive graph parameter addition.",
            "<b>CLI Version Command Fix:</b> Removed static compilation version strings inside the Kinetix CLI <code>main.rs</code> executable, implementing dynamic cross-evaluation against Cargo metadata and internal build macros to prevent version divergence."
        ]
    },
    {
        version: "v0.0.7 (16)",
        date: "2026-02-23",
        changes: [
            "<b>AST & Parser Aggregates:</b> Extended the core syntax tree to natively support `StructLiteral` definitions (<code>Name { field: value }</code>) ensuring O(n) parsing complexity.",
            "<b>Parser Ambiguity Resolution:</b> Implemented stateful CFG lock constraints (<code>allow_struct_literal</code>) into the Parser to statically resolve syntax tree ambiguity between struct definitions and generic code blocks in <code>if</code>, <code>match</code>, <code>while</code>, and <code>for</code> expressions.",
            "<b>Type Normalization:</b> Hooked <code>StructLiteral</code> AST nodes down to <code>Type::Custom</code> normalization variants via a formal traversal mapping.",
            "<b>MIR Aggregate Lowering:</b> Built the <code>RValue::Aggregate</code> block instruction to naturally flatten nested struct expressions directly into ordered linear operations.",
            "<b>Borrow Graph Extension:</b> Taught the Borrow Checker to strictly enforce <i>Move</i> semantics inside struct initializations, successfully preventing use-after-move vulnerabilities at instantiation boundaries.",
            "<b>Drop Graph Integrity:</b> Mathematically certified via <code>drop_verify.rs</code> that Custom structure initialization generates structurally sound Reverse-Drop execution nodes automatically.",
            "<b>SSA Validation:</b> Placed a <code>ssa_validate.rs</code> integrity auditor immediately after Borrow checking to enforce atomic allocations and prohibit invalid field-splitting optimizations on nominal structs.",
            "<b>LLVM Backend Replay:</b> Implemented native machine code emission for Structs in <code>llvm_codegen.rs</code> mapping Kinetix linearly-aligned structs safely to LLVM Opaque <code>StructType</code> <code>alloca</code> allocations."
        ]
    },
    {
        version: "v0.0.6 (15)",
        date: "2026-02-23",
        changes: [
            "<b>Compiler: Wildcard Pattern Fix:</b> Resolved an issue in <code>symbol.rs</code> where the <code>_</code> wildcard in <code>match</code> statements was incorrectly processed as an undeclared standard identifier instead of skipping symbol bindings.",
            "<b>Compiler: Generic Type Variable Survival Fix:</b> Fixed a critical validation error in <code>types.rs</code> where generic functions returning unresolved polymorphic types (e.g. <code>println</code> returning <code>Void</code> instead of resolving a free <code>Type::Var</code>) caused post-monomorphization Panics. Added <code>apply_default()</code> to force orphaned Type::Vars to Void during MIR generation.",
            "<b>VM & Parser: Function Call Lowering Fix:</b> Identified and resolved a bug in <code>mir.rs</code> where <code>HirExprKind::Call</code> and <code>ArrayLiteral</code> were falling through to a null return rather than properly lowering to <code>RValue::Call</code> and <code>RValue::Array</code>. The Borrow Checker now correctly tracks ownership paths through function arguments.",
            "<b>Borrow Checker: Linear Type Use-After-Move Fix:</b> Validated that the previous <code>mir.rs</code> fix correctly restores compile-time error detection for <i>use-after-move</i> constraint violations (e.g., passing a moved resource into a function now correctly fails the build).",
            "<b>Test Suite Reorganization:</b> Consolidated fragmented legacy test files into single unified <code>test_features.kix</code> and <code>test_errors.kix</code> files for efficient compiler regression testing."
        ]
    },
    {
        version: "v0.0.6 (14)",
        date: "2026-02-22",
        changes: [
            "<b>Monomorphization Pass:</b> Added explicit monomorphization to clone and specialize generic MIR functions into concrete versions.",
            "<b>AST Parsing Fix:</b> Resolved a greedy token consumption bug where <code>enum</code>, <code>trait</code>, and <code>impl</code> declarations consumed trailing block braces, causing <code>No prefix parse function for LBrace</code> errors downstream.",
            "<b>Type Normalization:</b> Implemented a compilation pass to flatten type aliases and canonicalize generic constraints before they hit the Trait Solver.",
            "<b>Structural Validation:</b> Added post-monomorphization compiler checks to enforce a maximum type depth limit (32 layers) and reject unresolved type variables.",
            "<b>Compile-Time Drop Verification:</b> Added topological block analysis to mathematically prevent double-free paths and drop calls on uninitialized variables.",
            "<b>Language Tests:</b> Added comprehensive testing suites for nested generic types, pattern matching, Option/Result, and trait definitions."
        ]
    },
    {
        version: "v0.0.6 (13)",
        date: "2026-02-22",
        changes: [
            "<b>Single-File GUI Installer:</b> Linux and macOS now produce a single standalone installer executable embedding <code>kivm</code> and <code>kicomp</code> via <code>include_bytes!</code>.",
            "<b>macOS .pkg Installer:</b> <code>build_macos.sh</code> now produces a proper <code>.pkg</code> installer with payload staging, post-install scripts, and LaunchServices registration.",
            "<b>macOS System Preferences Pane:</b> The macOS <code>.pkg</code> installs a <code>Kinetix.prefPane</code> into <code>/Library/PreferencePanes/</code>, making Kinetix appear in System Preferences (like Java).",
            "<b>X11/Wayland Crash Fix:</b> Fixed <code>MaximumRequestLengthExceeded</code> crash on Linux by disabling oversized window icon and prioritizing the Wayland backend via <code>WINIT_UNIX_BACKEND</code>.",
            "<b>File Associations (Linux):</b> Installer now registers XDG MIME types (<code>application/x-kinetix-bundle</code> for <code>.exki</code>, <code>text/x-kinetix-source</code> for <code>.kix</code>/<code>.ki</code>) and updates the desktop database.",
            "<b>File Associations (macOS):</b> A <code>Kinetix.app</code> handler bundle is installed with <code>CFBundleDocumentTypes</code> for <code>.kix</code>, <code>.ki</code>, and <code>.exki</code>, plus <code>lsregister</code> refresh."
        ]
    },
    {
        version: "v0.0.6 (12)",
        date: "2026-02-22",
        changes: [
            "<b>Exhaustiveness Checker:</b> Matrix-based compilation pass that guarantees ADT coverage for <code>Option&lt;T&gt;</code> and <code>Result&lt;T,E&gt;</code> in <code>match</code> statements.",
            "<b>Generic DOS Protection:</b> The HM Type Inference engine now tracks unification depth with a strict 32-layer threshold, preventing compilation lockups from recursive instantiations.",
            "<b>Trait Cycle Detection:</b> The Trait Solver now implements an acyclic deterministic graph walker that guarantees trait dependencies do not spin into infinite loops.",
            "<b>Nominal Trait System:</b> <code>TraitEnvironment</code> with <code>register_trait</code> and <code>register_impl</code> enforcing coherence rules (Orphan check, no overlapping impls). Deterministic resolution at HIR level.",
            "<b>HIR Match Lowering:</b> <code>match</code> expressions are now fully lowered from AST to typed HIR with pattern extraction (<code>HirPattern::Variant</code>, <code>HirPattern::Literal</code>, <code>HirPattern::Wildcard</code>).",
            "<b>Compiler Pipeline Integration:</b> Exhaustiveness checking and trait cycle validation are hooked into both <code>kivm exec</code> and <code>kivm compile</code> commands, running after HM type inference."
        ]
    },
    {
        version: "v0.0.6 (11)",
        date: "2026-02-22",
        changes: [
            "<b>Enum, Trait, Impl Syntax:</b> Added full syntax parsing and AST models for <code>enum</code>, <code>trait</code>, and <code>impl</code> blocks.",
            "<b>Generic Type Parameters:</b> The lexer and parser now extract parameterized type signatures such as <code>trait Iterator&lt;T&gt;</code> or <code>enum Result&lt;T, E&gt;</code>.",
            "<b>Try Operator <code>?</code>:</b> Added <code>?</code> as a postfix operator for structured error propagation. Desugared at compile time into <code>match expr { Ok(v) =&gt; v, Err(e) =&gt; return Err(e) }</code>.",
            "<b>Generic Type System:</b> Types now natively support generic arguments (e.g. <code>Option&lt;int&gt;</code>, <code>Result&lt;str, int&gt;</code>). Type unification recursively matches generic parameters.",
            "<b>Option&lt;T&gt; Builtin:</b> <code>Option</code>, <code>Some</code>, and <code>None</code> are available as global builtins with polymorphic type inference.",
            "<b>Result&lt;T,E&gt; Builtin:</b> <code>Result</code>, <code>Ok</code>, and <code>Err</code> are available as global builtins with dual-generic type inference.",
            "<b>Pattern Matching:</b> Full <code>match</code> expression support with variant destructuring, literal patterns, wildcard (<code>_</code>), and variable bindings."
        ]
    },
    {
        version: "v0.0.5 (10)",
        date: "2026-02-21",
        changes: [
            "<b>MIR Layer (Ownership Resolved IR):</b> New Mid-level IR (<code>mir.rs</code>) that explicitly represents <code>Move</code>, <code>Copy</code>, and <code>Borrow</code> semantics based on type copyability. Primitives are duplicated; heap-allocated types (<code>str</code>, <code>Array</code>, <code>Map</code>) use strict ownership moves.",
            "<b>Borrow Graph (<code>&</code> / <code>&mut</code>):</b> Added <code>&</code> (immutable borrow) and <code>&mut</code> (mutable borrow) operators to the lexer, parser, HIR, and type system. These generate <code>Operand::Borrow</code> edges in MIR instead of ownership transfers.",
            "<b>Automatic Drop Injection:</b> <code>MirBuilder</code> now tracks lexical scopes and automatically injects <code>Drop(Place)</code> instructions for non-trivially-copyable variables when leaving a scope block.",
            "<b>Borrow Checker Engine (<code>borrowck.rs</code>):</b> New graph-based borrow checker pass that traverses the MIR Control Flow Graph. Tracks variable states (<code>Uninitialized</code>, <code>Initialized</code>, <code>Moved</code>) and rejects Use-After-Move violations at compile time.",
            "<b>Unified Compiler Pipeline:</b> The full 5-step pipeline (<code>AST → Symbol Resolution → Type Constraints → MIR → Borrow Checker → Codegen</code>) is now integrated into <code>kivm exec</code> and <code>kivm compile</code>. Ownership violations produce clean compiler errors.",
            "<b>Legacy Cleanup:</b> Removed duplicate ownership checks from the old <code>compiler.rs</code> backend. The Borrow Checker (<code>borrowck.rs</code>) is now the sole authority on ownership semantics.",
            "<b>Function MIR Lowering:</b> <code>HirStmtKind::Function</code> definitions are now properly lowered into separate <code>MirFunction</code> entries and analyzed by the borrow checker.",
            "<b>Type System:</b> Added <code>Type::Ref(Box&lt;Type&gt;)</code> and <code>Type::MutRef(Box&lt;Type&gt;)</code> variants. Updated unification and constraint collection for reference types.",
            "<b>Build Version:</b> Updated build identifier to Build 10. Documentation and version strings updated."
        ]
    },
    {
        version: "v0.0.4 (9)",
        date: "2026-02-21",
        changes: [
            "<b>LLVM Function Definitions:</b> User-defined functions now compile to native LLVM IR. Parameters, return values, and cross-function calls are fully supported.",
            "<b>LLVM Native Data Types:</b> Strings and Arrays are now compiled as native LLVM <code>StructType</code> (<code>{ i64 length, i8* data }</code> and <code>{ i64 len, i64 cap, i64* data }</code>).",
            "LLVM codegen now declares <code>malloc</code>, <code>memcpy</code>, <code>strcmp</code> from libc for dynamic memory allocation.",
            "<b>Math Bindings:</b> <code>math.sin</code>, <code>math.cos</code>, <code>math.sqrt</code>, <code>math.pow</code> compile directly to native <code>libm</code> calls via LLVM.",
            "<b>Array Literals:</b> <code>[1, 2, 3]</code> in native mode allocates heap memory via <code>malloc</code> and stores elements via <code>GetElementPtr</code>.",
            "<b>Tail Call Optimization:</b> The compiler detects <code>return f(x)</code> patterns and emits <code>TailCall</code> opcode instead of <code>Call + Return</code>, reusing the stack frame for constant-space recursion.",
            "<b>Runtime Error Line Numbers:</b> Errors now display source line numbers and function names (e.g., <code>[line 5] in &lt;main&gt;: Invalid types for Add</code>).",
            "<b>Type System Foundation:</b> Four new compiler modules — <code>types.rs</code> (Type enum with HM variables), <code>symbol.rs</code> (scoped symbol table), <code>hir.rs</code> (typed AST), <code>typeck.rs</code> (constraint collection + Robinson unification with occurs check).",
            "<b>Language Specification:</b> Formalized EBNF syntax, Hindley-Milner Type Inference rules, and Linear Type System documentation.",
            "<b>Language Reference Draft:</b> Created formal Kinetix Language Reference document covering types, ownership, control flow, and memory model.",
            "<b>VM Fix:</b> Implemented <code>Opcode::And</code> and <code>Opcode::Or</code> handlers for logical <code>&&</code> and <code>||</code> operators.",
            "<b>Backward Compatibility:</b> <code>.exki</code> files compiled before this build now load correctly (<code>line_map</code> defaults to empty).",
            "<b>Documentation:</b> Renamed <code>since</code> badge to <code>Implemented</code> across all API docs."
        ]
    },
    {
        version: "v0.0.3 (8)",
        date: "2026-02-19",
        changes: [
            "<b>LLVM Backend (Build 8):</b> Initial implementation of native code generation via LLVM 21.",
            "New CLI flag: <code>kivm compile --native</code> compiles Kinetix source to native object files (<code>.o</code>).",
            "Added <code>llvm</code> feature flag to <code>kicomp</code> and <code>cli</code> crates.",
            "<b>CI Fix:</b> Resolved type mismatch in <code>builtins.rs</code> tests by using <code>VM::new(CompiledProgram::new())</code>.",
            "Architecture: Introduced <code>LLVMCodegen</code> for AST-to-LLVM-IR translation using <code>inkwell</code> crate.",
            "<b>Graph Module:</b> Added <code>draw_line</code> and <code>draw_circle</code> for primitive geometric rendering.",
            "<b>Documentation:</b> Systematized API statuses across all JS modules and standardized output bindings to <code>print</code>."
        ]
    },
    {
        version: "v0.0.3 (7)",
        date: "2026-02-19",
        changes: [
            "<b>Arena Allocation:</b> AST nodes are now allocated in a contiguous memory arena (<code>bumpalo</code>). Zero heap fragmentation and faster parsing.",
            "Replaced all <code>Box&lt;T&gt;</code> with arena references <code>&amp;'a T</code> in the AST, Parser, and Compiler.",
            "Parser now accepts a <code>&amp;Bump</code> arena and allocates nodes via <code>arena.alloc()</code>.",
            "<b>Installer Fix:</b> Build script corrected to produce installer with up-to-date binaries.",
            "Installer: added PATH conflict detection to diagnose version shadowing.",
            "Build script: added <code>cargo clean</code> step and version injection (<code>KINETIX_BUILD</code>).",
            "All 32 parser tests passing with arena-allocated AST."
        ]
    },
    {
        version: "v0.0.3 (6)",
        date: "2026-02-19",
        changes: [
            "<b>Fixed:</b> Version display in documentation and CLI now correctly shows v0.0.3 Build 6.",
            "<b>Fixed:</b> Installer now correctly updates the CLI version.",
            "Removed installation log from installer UI.",
            "<b>Core Architecture Upgrade:</b> Switched to <b>16-bit bytecode</b> (u16 operands). The VM now supports up to <b>65,535 registers and constants</b> per stack frame (previously 255).",
            "<b>Linear Type System:</b> Implemented <b>Ownership & Borrowing</b> checks. Variables now have move semantics; using a moved value triggers a compile-time error. This ensures memory safety without a GC.",
            "Compiler Optimization: <code>println()</code> is now an intrinsic that emits a direct <code>Opcode::Print</code> instruction.",
            "Internal: Refactored <code>Compiler</code> and <code>VM</code> to support larger stack frames and dynamic register allocation."
        ]
    },
    {
        version: "v0.0.2 (5)",
        date: "2026-02-17",
        changes: [
            "<b>Kinetix Shell:</b> <code>kivm shell</code> — interactive terminal with bash-like commands (ls, cd, cat, mkdir, rm, cp, mv, echo, pwd, touch, which, whoami, grep, head, tail, wc) + Kinetix expression evaluation + system command fallback.",
            "Terminal Module (<code>term.*</code>): ANSI control functions — <code>clear</code>, <code>set_color</code>, <code>reset_color</code>, <code>bold</code>, <code>italic</code>, <code>underline</code>, <code>strikethrough</code>, <code>color_print</code>, <code>move_cursor</code>, <code>hide_cursor</code>, <code>show_cursor</code>, <code>size</code>.",
            "Terminal Module: Bash-like commands — <code>ls</code>, <code>cd</code>, <code>pwd</code>, <code>cat</code>, <code>mkdir</code>, <code>rm</code>, <code>cp</code>, <code>mv</code>, <code>echo</code>, <code>touch</code>, <code>which</code>, <code>whoami</code>, <code>env</code>, <code>head</code>, <code>tail</code>, <code>wc</code>, <code>grep</code>.",
            "Documentation: <code>kivm docs</code> opens offline documentation in the default browser.",
            "Installer: no console window on Windows (<code>#![windows_subsystem = \"windows\"]</code>).",
            "Installer: step-by-step progress bar during installation.",
            "Installer: option to install offline documentation.",
            "Installer: KiFile.png icon embedded for file associations on all platforms.",
            "Linux: <code>.desktop</code> entries for Kinetix and Kinetix Shell."
        ]
    },
    {
        version: "v0.0.2 (4)",
        date: "2026-02-17",
        changes: [
            "Data Module: File IO (<code>read_text</code>, <code>write_text</code>, <code>read_bytes</code>, <code>exists</code>, <code>list_dir</code>, <code>alloc</code>, <code>copy</code>).",
            "IO Formats: <code>json.parse</code>/<code>stringify</code> and <code>csv.parse</code>/<code>write</code>.",
            "Database Module: SQLite integration via <code>db.connect</code>, <code>query</code>, <code>execute</code>.",
            "Graph Module: Native UI Widgets (<code>window</code>, <code>button</code>, <code>label</code>, <code>input_text</code>) and Plotting (<code>plot_lines</code>).",
            "LLM Module: Local inference via Ollama (<code>llm.chat</code>, <code>llm.generate</code>).",
            "Cross-platform installer: supports Windows, Linux, and macOS.",
            "CLI: <code>compile --exe</code> produces correct binary names on all platforms.",
            "README updated with language features and standard library overview."
        ]
    },
    {
        version: "v0.0.1 (3)",
        date: "2026-02-16",
        changes: [
            "Native Executable Bundling: <code>kivm compile --exe</code> creates single-file standalone executables.",
            "System Module: added <code>cpu_usage</code>, <code>memory_free</code>, <code>uptime</code>, <code>os_name</code>, <code>os_version</code>, <code>hostname</code>, <code>user_name</code>.",
            "System Module: implemented <code>shell</code>, <code>get_hardware_info</code>, <code>clipboard_set</code>, <code>clipboard_get</code>, <code>gc</code>.",
            "Net Module: added <code>get</code>, <code>post</code>, <code>download</code>.",
            "Graph Module: added <code>plot_lines</code>, <code>plot_histogram</code>, <code>tree_node</code>, <code>table</code> widgets.",
            "Crypto Module: added <code>hash</code>, <code>hmac</code>, <code>uuid</code>, <code>random_bytes</code>.",
            "Audio Module: added <code>play_oneshot</code> and <code>play_stream</code>.",
            "Env Module: added <code>cwd</code>, <code>set_cwd</code>.",
            "Documentation: fixed status contradictions (Not Implemented + Since shown together).",
            "Fixed missing tags for Vector/Matrix functions in Math module.",
            "Fixed <code>sysinfo</code> dependencies for cross-platform support."
        ]
    },
    {
        version: "v0.0.1 (2)",
        date: "2026-02-15",
        changes: [
            "Expanded Standard Library with ~40 new functions across String, List, Math, Vector, System/Env/Time modules.",
            "New global string functions: <code>to_upper</code>, <code>to_lower</code>, <code>trim</code>, <code>split</code>, <code>replace</code>, <code>contains</code>, <code>starts_with</code>, <code>ends_with</code>, <code>pad_left</code>, <code>pad_right</code>, <code>join</code>.",
            "New global list functions: <code>push</code>, <code>pop</code>, <code>remove_at</code>, <code>insert</code>, <code>reverse</code>, <code>sort</code>, <code>min</code>, <code>max</code>, <code>any</code>, <code>all</code>.",
            "New iteration helpers: <code>range</code>, <code>enumerate</code>, <code>zip</code>.",
            "New Math extras: <code>asin</code>, <code>acos</code>, <code>atan2</code>, <code>deg</code>, <code>rad</code>, <code>cbrt</code>, <code>exp</code>, <code>log</code>, <code>log10</code>, <code>clamp</code>, <code>lerp</code>.",
            "New Vector math: <code>math.vector2</code>, <code>math.vector3</code>, <code>math.dot</code>, <code>math.cross</code>, <code>math.length</code>, <code>math.normalize</code>, <code>math.distance</code>.",
            "New System/Env/Time: <code>time.now</code>, <code>time.sleep</code>, <code>time.ticks</code>, <code>env.get</code>, <code>env.set</code>, <code>env.args</code>, <code>byte</code>, <code>char</code>.",
            "Added <code>#version</code> directive for build-version checking.",
            "Dot-notation access for modules: <code>Math</code>, <code>System</code>, <code>time</code>, <code>env</code>, etc.",
            "Added versioning badges (Since, Not Implemented, Deprecated) in API docs.",
            "Added CLI Reference and Directives documentation.",
            "Fixed compiler crash in long code blocks.",
            "Fixed <code>Math.min</code> and <code>Math.max</code> to preserve integer types."
        ]
    },
    {
        version: "v0.0.1 (1)",
        date: "2026-02-14",
        changes: [
            "Initial release of the Kinetix language.",
            "Lexer with 21 keywords, comments, range/float literals, and 20+ operators.",
            "Parser with <code>let</code>/<code>mut</code>, <code>fn</code>, <code>while</code>, <code>for..in</code>, <code>class</code>, <code>struct</code>, <code>#include</code>, <code>if</code>/<code>else</code>, arrays, member access, pattern matching.",
            "KiComp compiler: 30+ register-based opcodes, <code>.exki</code> bundle format.",
            "KiVM: register-based virtual machine with 256 registers.",
            "10 built-in functions: <code>print</code>, <code>println</code>, <code>input</code>, <code>len</code>, <code>typeof</code>, <code>assert</code>, <code>str</code>, <code>int</code>, <code>float</code>, <code>bool</code>.",
            "CLI commands: <code>kivm exec</code>, <code>kivm run</code>, <code>kivm compile</code>, <code>kivm version</code>.",
            "Graphical installer with component selection, PATH integration, and file associations.",
            "Documentation website with API browser, sidebar navigation, search, and syntax highlighting."
        ]
    }
];
