'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import CodeBlock from '@/components/CodeBlock';
import { Section } from '@/lib/types';
import { cn } from '@/lib/utils';

const sections: Section[] = [
  { id: 'overview', title: '概览', icon: '📊', badge: 'Go 程序员视角' },
  { id: 'type-system', title: '类型系统', icon: '🔷', badge: 'Go 对比' },
  { id: 'async-programming', title: '异步编程', icon: '⚡', badge: '并发模型对比' },
  { id: 'oop', title: '面向对象', icon: '🏗️', badge: '结构体 vs 类' },
  { id: 'null-safety', title: '空安全', icon: '🛡️', badge: 'nil vs null' },
  { id: 'functional', title: '函数式编程', icon: '🔄', badge: '高阶函数' },
  { id: 'patterns', title: '模式匹配', icon: '🎯', badge: 'switch vs when' },
  { id: 'comparison', title: '语言对比', icon: '⚖️', badge: '完整对比' },
];

export default function Home() {
  const [currentSection, setCurrentSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedSection = localStorage.getItem('dart-tutorial-section');
    if (savedSection) {
      setCurrentSection(savedSection);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('dart-tutorial-section', currentSection);
    }
  }, [currentSection, mounted]);

  const progress = Math.round(((sections.findIndex(s => s.id === currentSection) + 1) / sections.length) * 100);

  const handleSectionChange = (sectionId: string) => {
    setCurrentSection(sectionId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!mounted) return null;

  const currentSectionData = sections.find(s => s.id === currentSection);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-3.5 left-3.5 w-9 h-9 rounded-lg bg-primary border-none cursor-pointer z-50 shadow-md flex items-center justify-center text-white text-lg hover:bg-primary-dark active:scale-95"
        aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <div className={cn(
        'lg:translate-x-0 transition-transform duration-200 z-40',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <Sidebar 
          sections={sections}
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
          progress={progress}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-60 p-6 lg:p-10 lg:pr-20 max-w-5xl">
        <div className="flex flex-col gap-5.5">
          {/* Section Header */}
          <div className="flex items-center gap-2.5 mb-1 pb-3 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              {currentSectionData?.title}
            </h2>
            {currentSectionData && (
              <div className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded uppercase tracking-wider">
                {currentSectionData.badge}
              </div>
            )}
          </div>

          {/* Content Sections */}
          {renderContent(currentSection)}
        </div>
      </main>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

function renderContent(sectionId: string) {
  switch (sectionId) {
    case 'overview':
      return <OverviewSection />;
    case 'type-system':
      return <TypeSystemSection />;
    case 'async-programming':
      return <AsyncProgrammingSection />;
    case 'oop':
      return <OOPSection />;
    case 'null-safety':
      return <NullSafetySection />;
    case 'functional':
      return <FunctionalSection />;
    case 'patterns':
      return <PatternsSection />;
    case 'comparison':
      return <ComparisonSection />;
    default:
      return <OverviewSection />;
  }
}

function OverviewSection() {
  return (
    <>
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          为什么 Go 程序员要学习 Dart？
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3.5 leading-relaxed text-sm">
          作为 Go 程序员，你已经习惯了简洁、高效、并发优先的编程范式。Dart 作为一门现代语言，在某些方面与 Go 相似，但在其他方面提供了不同的解决方案：
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {[
            { icon: '⚡', title: '并发模型对比', content: 'Go: Goroutine + Channel\nDart: Event Loop + Isolate' },
            { icon: '🎯', title: '错误处理', content: 'Go: error 返回值\nDart: Exception + try/catch' },
            { icon: '🏗️', title: '类型系统', content: 'Go: 结构体 + 组合\nDart: 类 + 继承 + Mixin' },
            { icon: '🔄', title: '异步编程', content: 'Go: goroutine + select\nDart: async/await + Stream' },
          ].map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-center transition-all duration-150 border border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-gray-100 dark:hover:bg-gray-800">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">{item.title}</h4>
              <p className="text-xs text-gray-700 dark:text-gray-300 m-0 leading-relaxed whitespace-pre-line">{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">核心差异速览</h3>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm border border-gray-200 dark:border-gray-700">
            <thead>
              <tr>
                <th className="px-3.5 py-2.5 text-left border-b border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-bold text-gray-900 dark:text-gray-100 sticky top-0">特性</th>
                <th className="px-3.5 py-2.5 text-left border-b border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-bold text-gray-900 dark:text-gray-100 sticky top-0">Dart</th>
                <th className="px-3.5 py-2.5 text-left border-b border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-bold text-gray-900 dark:text-gray-100 sticky top-0">Go</th>
                <th className="px-3.5 py-2.5 text-left border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-bold text-gray-900 dark:text-gray-100 sticky top-0">对 Go 程序员的影响</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: '类型系统', dart: '面向对象 + 泛型', go: '组合优先 + 泛型', impact: '需要适应继承和类概念' },
                { feature: '并发模型', dart: 'Event Loop + Isolate', go: 'Goroutine + Channel', impact: '理解单线程 Event Loop 模型' },
                { feature: '错误处理', dart: 'Exception + try/catch', go: 'error 返回值', impact: '适应异常而非错误值' },
                { feature: '编译方式', dart: 'JIT + AOT 双模式', go: 'AOT', impact: '享受热重载开发体验' },
                { feature: '接口', dart: '显式 implements', go: '隐式鸭子类型', impact: '需要显式声明接口实现' },
              ].map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-3.5 py-2.5 border-b border-r border-gray-200 dark:border-gray-700">{row.feature}</td>
                  <td className="px-3.5 py-2.5 border-b border-r border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-bold">{row.dart}</td>
                  <td className="px-3.5 py-2.5 border-b border-r border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-bold">{row.go}</td>
                  <td className="px-3.5 py-2.5 border-b border-gray-200 dark:border-gray-700">{row.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Hello World 对比</h3>
        <CodeBlock 
          language="dart"
          title="Go vs Dart"
          code={`// Go 版本
package main

import "fmt"

func main() {
    // 类型推断
    name := "Go"
    
    // fmt.Printf 不支持字符串插值
    fmt.Printf("Hello, %s!\\n", name)
    
    // 数组 vs 切片
    numbers := []int{1, 2, 3, 4, 5}
    
    // 没有级联操作符
    numbers = append(numbers, 6)
    sort.Ints(numbers)
    
    // 匿名函数
    doubled := mapFunc(numbers, func(n int) int {
        return n * 2
    })
    fmt.Println(doubled)
}

func mapFunc(arr []int, fn func(int) int) []int {
    result := make([]int, len(arr))
    for i, v := range arr {
        result[i] = fn(v)
    }
    return result
}

// ====================

// Dart 版本
void main() {
  // 类型推断（与 Go 的 := 类似）
  var name = 'Dart';
  
  // 字符串插值（Go 需要 fmt.Printf）
  print('Hello, $name!');
  
  // List（Go 是 slice）
  var numbers = [1, 2, 3, 4, 5];
  
  // 级联操作符（Go 没有这个）
  numbers
    ..add(6)
    ..sort();
    
  // 箭头函数（Go 是匿名函数）
  var doubled = numbers.map((n) => n * 2);
  print(doubled); // (2, 4, 6, 8, 10, 12)
}`}
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Go → Dart 学习路径</h3>
        <ul className="list-none p-0">
          {[
            '<strong>语法相似性</strong>：变量声明、函数定义、import 语句都很相似',
            '<strong>最大的转变</strong>：从结构体+组合转向类+继承，从 error 值转向异常',
            '<strong>并发思维</strong>：从多线程 Goroutine 转向单线程 Event Loop',
            '<strong>类型系统</strong>：从隐式接口转向显式 implements',
            '<strong>空安全</strong>：Dart 的空安全比 Go 的 nil 更严格',
          ].map((item, index) => (
            <li key={index} className="py-2 pl-5 relative text-gray-700 dark:text-gray-300 leading-relaxed text-sm before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function TypeSystemSection() {
  return (
    <>
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">类型推断对比</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3.5 leading-relaxed text-sm">
          Go 的 := 和 Dart 的 var 很相似，但语义有些差异
        </p>
        <CodeBlock 
          language="dart"
          title="Go vs Dart: 类型推断"
          code={`// Go 版本
package main

func main() {
    // := 只能在函数内使用
    name := "Go"           // 推断为 string
    count := 42            // 推断为 int
    items := []string{}    // 推断为 []string
    
    // const 需要编译时确定
    const maxItems = 100
    
    // Go 没有类似于 Dart 的 final
    // 如果要不可变，使用大写命名约定（包外不可见）或不修改
}

// ====================

// Dart 版本
void main() {
  // var 可在任意位置使用
  var name = 'Dart';        // 推断为 String
  final count = 42;         // 推断为 int（运行时常量，不可变）
  const maxItems = 100;     // 编译时常量
  late Config config;       // 延迟初始化（Go 没有这个）
  
  // List 字面量
  var items = <String>[];   // 明确泛型
  
  // ⚠️ 注意：Dart 的 var 是类型推断，不是重新赋值
  // var message = calculate(); // 如果返回类型不明确，建议显式声明
  
  // ✅ 推荐明确类型
  String result = calculate(); // 清晰表达意图
  
  // ✅ 返回类型和参数类型必须明确
  List<User> getUsersById(List<int> ids) {
    return ids.map((id) => User.findById(id)).toList();
  }
}`}
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">泛型系统对比</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3.5 leading-relaxed text-sm">
          Go 1.18+ 支持泛型，与 Dart 的泛型系统在约束语法上有所不同
        </p>
        <CodeBlock 
          language="dart"
          title="Go vs Dart: 泛型约束"
          code={`// Go 版本
package main

import "fmt"

// 约束：类型参数必须实现指定接口
type Numeric interface {
    int | int64 | float64
}

func Sum[T Numeric](values []T) T {
    var total T
    for _, v := range values {
        total += v
    }
    return total
}

// 多个类型参数
func Pair[K comparable, V any](k K, v V) (K, V) {
    return k, v
}

// 嵌套约束
type Ordered interface {
    comparable
    Less(other any) bool
}

func Sort[T Ordered](values []T) {
    // 排序逻辑
}

// ====================

// Dart 版本
// 泛型约束：使用 extends 关键字
class Repository<T extends Entity> {
  final Map<int, T> _cache = {};
  
  Future<T?> findById(int id) async {
    if (_cache.containsKey(id)) {
      return _cache[id];
    }
    final data = await _fetchFromDb(id);
    if (data != null) {
      _cache[id] = data;
    }
    return data;
  }
  
  Future<T?> _fetchFromDb(int id);
}

// 泛型方法
T firstOrNull<T>(List<T> list) {
  return list.isEmpty ? null : list.first;
}

// 多重约束（Dart 使用 & 符号，Go 需要定义组合接口）
class Serializer<T extends Serializable & Comparable<T>> {
  String serialize(T obj) {
    return obj.toJson();
  }
}

// Go 的 any 对应 Dart 的 Object? 或 dynamic
// Go 的 comparable 对应 Dart 没有直接等价物，需要手动实现 == 和 hashCode

// 使用
final userRepo = Repository<User>();
final result = firstOrNull<String>(['a', 'b']); // 'a'
final sum = Sum<int>([1, 2, 3]); // 6`}
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">扩展方法对比</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3.5 leading-relaxed text-sm">
          Dart 的 extension 是 Go 没有的强大特性，无需继承即可扩展类型
        </p>
        <CodeBlock 
          language="dart"
          title="Go vs Dart: 扩展方法"
          code={`// Go 版本 - Go 没有扩展方法！
// 只能创建辅助函数
package main

import (
    "fmt"
    "regexp"
    "strings"
)

func IsValidEmail(email string) bool {
    matched, _ := regexp.MatchString(
    \`^[\\w-\\.]+@[\\w-]+\\.[\\w-]{2,4}$\`, 
    email,
    )
    return matched
}

func Capitalize(s string) string {
    if len(s) == 0 {
        return s
    }
    return strings.ToUpper(string(s[0])) + s[1:]
}

// 使用
email := "test@example.com"
if IsValidEmail(email) {
    fmt.Println(Capitalize(email))
}

// ====================

// Dart 版本 - Extension 提供原生支持
// 扩展 String
extension StringValidation on String {
  bool get isValidEmail => 
      RegExp(r'^[\\w-\\.]+@[\\w-]+\\.[\\w-]{2,4}$').hasMatch(this);
  
  String capitalize() => 
      this.isEmpty ? this : this[0].toUpperCase() + substring(1);
}

// 扩展 List - 泛型扩展
extension ListOperations<T> on List<T> {
  List<T> distinct() => [...{...this}];
  
  T? firstWhereOrNull(bool Function(T) test) {
    for (var item in this) {
      if (test(item)) return item;
    }
    return null;
  }
}

// 使用 - 语法更自然，像原生方法
print('test@example.com'.isValidEmail); // true
print('hello'.capitalize()); // 'Hello'
print([1, 2, 2, 3].distinct()); // [1, 2, 3]
print(['a', 'b'].firstWhereOrNull((s) => s == 'b')); // 'b'`}
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">类型系统关键差异</h3>
        <ul className="list-none p-0">
          {[
            '<strong>接口实现</strong>：Go 是隐式鸭子类型，Dart 需要显式 implements',
            '<strong>空安全</strong>：Dart 在编译时保证，Go 运行时可能出现 nil panic',
            '<strong>扩展方法</strong>：Dart 有原生 extension，Go 只能用辅助函数',
            '<strong>类型推断</strong>：Go 的 := 只能在函数内，Dart 的 var 无此限制',
            '<strong>泛型约束</strong>：Go 使用接口组合，Dart 使用 extends 和 &',
          ].map((item, index) => (
            <li key={index} className="py-2 pl-5 relative text-gray-700 dark:text-gray-300 leading-relaxed text-sm before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function AsyncProgrammingSection() {
  return (
    <>
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">并发模型根本差异</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3.5 leading-relaxed text-sm">
          这是 Go 和 Dart 最大的区别！理解这一点对 Go 程序员至关重要：
        </p>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm border border-gray-200 dark:border-gray-700">
            <thead>
              <tr>
                <th className="px-3.5 py-2.5 text-left border-b border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-bold text-gray-900 dark:text-gray-100 sticky top-0">特性</th>
                <th className="px-3.5 py-2.5 text-left border-b border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-bold text-gray-900 dark:text-gray-100 sticky top-0">Go</th>
                <th className="px-3.5 py-2.5 text-left border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-bold text-gray-900 dark:text-gray-100 sticky top-0">Dart</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: '执行模型', go: '多线程（M:N 调度）', dart: '单线程 Event Loop' },
                { feature: '并发原语', go: 'Goroutine + Channel', dart: 'Future + Stream + Isolate' },
                { feature: '通信方式', go: '共享内存 + Channel', dart: '消息传递（Isolate 间）' },
                { feature: '数据共享', go: '共享可变状态（需同步）', dart: '默认不可共享（Isolate 隔离）' },
                { feature: '阻塞操作', go: '阻塞 Goroutine（调度器处理）', dart: '阻塞整个 Event Loop（需避免）' },
              ].map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-3.5 py-2.5 border-b border-r border-gray-200 dark:border-gray-700">{row.feature}</td>
                  <td className="px-3.5 py-2.5 border-b border-r border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-bold">{row.go}</td>
                  <td className="px-3.5 py-2.5 border-b border-gray-200 dark:border-gray-700">{row.dart}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">并发执行对比</h3>
        <CodeBlock 
          language="dart"
          title="Go vs Dart: 并发执行"
          code={`// Go 版本 - Goroutine
package main

import (
    "fmt"
    "sync"
)

func fetchUserData(userId int, wg *sync.WaitGroup, ch chan<- string) {
    defer wg.Done()
    // 阻塞操作不会阻塞其他 goroutine
    data := httpGet(fmt.Sprintf("/api/users/%d", userId))
    ch <- data
}

func loadDashboard() {
    var wg sync.WaitGroup
    ch := make(chan string, 3)
    
    wg.Add(3)
    go fetchUserData(1, &wg, ch)
    go fetchUserPosts(1, &wg, ch)
    go fetchUserSettings(1, &wg, ch)
    
    // 等待所有 goroutine 完成
    go func() {
        wg.Wait()
        close(ch)
    }()
    
    // 收集结果
    results := make([]string, 0)
    for data := range ch {
        results = append(results, data)
    }
    
    renderDashboard(results)
}

// 错误处理 - Go 使用 error 返回值
func safeFetch() error {
    data, err := fetchData()
    if err != nil {
        return fmt.Errorf("fetch failed: %w", err)
    }
    fmt.Println(data)
    return nil
}

// ====================

// Dart 版本 - async/await
// 注意：Dart 默认单线程，async/await 让出执行权给 Event Loop
Future<String> fetchUserData(int userId) async {
  final response = await http.get('/api/users/$userId');
  if (response.statusCode == 200) {
    return response.body;
  }
  throw Exception('Failed to load user');
}

// 并发执行 - 类似 Go 的 WaitGroup
Future<void> loadDashboard() async {
  // 并行请求（Go 使用 goroutine + channel）
  final results = await Future.wait([
    fetchUserData(1),
    fetchUserPosts(1),
    fetchUserSettings(1),
  ]);
  
  final [user, posts, settings] = results;
  renderDashboard(user, posts, settings);
}

// 错误处理 - Dart 使用异常（Go 用 error 值）
Future<void> safeFetch() async {
  try {
    final data = await fetchData();
    print(data);
  } on TimeoutException catch (e) {
    print('请求超时: $e');
  } on HttpException catch (e) {
    print('HTTP错误: $e');
  } catch (e) {
    print('未知错误: $e');
  } finally {
    print('请求完成');
  }
}

// 关键差异：
// 1. Go: goroutine 可以真正并行执行（多核）
// 2. Dart: async/await 只是让出执行权，仍是单线程
// 3. Go: channel 用于通信，也可以同步
// 4. Dart: Future.wait 等待多个 Future 完成`}
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Stream vs Channel</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3.5 leading-relaxed text-sm">
          Dart 的 Stream 类似 Go 的 Channel，但语义不同
        </p>
        <CodeBlock 
          language="dart"
          title="Go vs Dart: 数据流处理"
          code={`// Go 版本 - Channel
package main

func counter(ch chan<- int) {
    for i := 1; i <= 10; i++ {
        time.Sleep(time.Second)
        ch <- i
    }
    close(ch)
}

func listenToCounter() {
    ch := make(chan int)
    go counter(ch)
    
    for value := range ch {
        fmt.Printf("计数: %d\\n", value)
    }
}

// 使用 select 处理多个 channel
func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)
    
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }
    
    // select 监听多个 channel
    select {
    case msg := <-ch1:
        fmt.Println(msg)
    case msg := <-ch2:
        fmt.Println(msg)
    case <-time.After(time.Second):
        fmt.Println("超时")
    }
}

// ====================

// Dart 版本 - Stream
// 创建 Stream
Stream<int> counter() async* {
  for (int i = 1; i <= 10; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}

// 监听 Stream
void listenToCounter() {
  counter().listen(
    (value) => print('计数: $value'),
    onError: (error) => print('错误: $error'),
    onDone: () => print('完成'),
  );
}

// Stream 转换 - 函数式风格（Go 需要手动写循环）
Stream<String> processEvents() {
  return eventStream
    .where((event) => event.type == 'important')      // 过滤
    .map((event) => event.message.toUpperCase())      // 映射
    .take(10)                                          // 限制数量
    .distinct();                                       // 去重
}

// Dart 没有直接等价于 select 的语法
// 但可以使用 StreamGroup 合并多个 Stream
import 'package:async/async.dart';

void advancedStreamProcessing() {
  final merged = StreamGroup.merge([
    userEvents,
    systemEvents,
  ]);
  
  merged
    .debounce(Duration(milliseconds: 300))   // 防抖
    .buffer(Duration(seconds: 1))            // 批处理
    .listen((events) => processBatch(events));
}

// 关键差异：
// 1. Go: channel 是缓冲的或有界的，可以用于同步
// 2. Dart: Stream 是推式的，类似 RxJS 的 Observable
// 3. Go: select 可以等待多个 channel（Dart 需要用 StreamGroup）
// 4. Dart: Stream 有丰富的操作符（map, filter, reduce 等）
// 5. Go: channel 通信会复制数据（除非用指针），Dart Stream 传递引用`}
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Go 程序员迁移指南</h3>
        <ul className="list-none p-0">
          {[
            '<strong>不要阻塞 Event Loop</strong>：Dart 单线程，同步阻塞会卡死整个应用',
            '<strong>async/await 不是真正的并行</strong>：只是让出执行权，类似 Go 的 goroutine yield',
            '<strong>Isolate 用于 CPU 密集型</strong>：类似 Go 的 goroutine，但成本更高',
            '<strong>Stream 是推式的</strong>：Go channel 可以拉取，Dart Stream 只能监听',
            '<strong>错误处理方式</strong>：Go 用 error 返回值，Dart 用异常',
          ].map((item, index) => (
            <li key={index} className="py-2 pl-5 relative text-gray-700 dark:text-gray-300 leading-relaxed text-sm before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function OOPSection() {
  return (
    <>
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">结构体 vs 类</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3.5 leading-relaxed text-sm">
          Go 的结构体和 Dart 的类在概念上有根本差异
        </p>
        <CodeBlock 
          language="dart"
          title="Go vs Dart: 数据结构定义"
          code={`// Go 版本 - 结构体
package main

import "fmt"

// 结构体定义
type User struct {
    ID    string
    Name  string
    Email string
    // 嵌入结构体（组合）
    Profile
    CreatedAt time.Time
}

// 嵌入的结构体
type Profile struct {
    Avatar string
    Bio    string
}

// 构造函数（不是语法特性，只是约定）
func NewUser(name, email string) *User {
    return &User{
        ID:        generateID(),
        Name:      name,
        Email:     email,
        CreatedAt: time.Now(),
    }
}

// 方法（接收者可以是值或指针）
func (u *User) UpdateEmail(email string) {
    u.Email = email
}

func (u User) FullName() string {
    return u.Name
}

// JSON 序列化需要 struct tags
type User struct {
    ID    string \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

func (u User) ToJSON() ([]byte, error) {
    return json.Marshal(u)
}

// ====================

// Dart 版本 - 类
class User {
  final String id;
  final String name;
  final String email;
  final DateTime createdAt;
  
  // 父类（Go 没有继承，只有组合）
  User({
    required this.id,
    required this.name,
    required this.email,
    DateTime? createdAt,
  }) : createdAt = createdAt ?? DateTime.now();
  
  // 命名构造函数（Go 没有这个）
  User.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        name = json['name'],
        email = json['email'],
        createdAt = DateTime.parse(json['createdAt']);
  
  // 工厂构造函数（Go 用 NewUser 函数）
  factory User.create({
    required String name,
    required String email,
  }) {
    return User(
      id: generateID(),
      name: name,
      email: email,
    );
  }
  
  // 方法（Dart 不需要显式的接收者声明）
  void updateEmail(String newEmail) {
    // Dart 的 final 字段不能修改
    // 需要返回新实例
    // User updatedUser = this.copyWith(email: newEmail);
  }
  
  String get fullName => name;
  
  // copyWith 模式（Go 没有这个语法糖）
  User copyWith({
    String? id,
    String? name,
    String? email,
    DateTime? createdAt,
  }) {
    return User(
      id: id ?? this.id,
      name: name ?? this.name,
      email: email ?? this.email,
      createdAt: createdAt ?? this.createdAt,
    );
  }
  
  // 序列化
  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'email': email,
    'createdAt': createdAt.toIso8601String(),
  };
}

// 关键差异：
// 1. Go: 结构体是值类型，可以复制；Dart: 类是引用类型
// 2. Go: 字段默认导出（大写）；Dart: 字段默认私有（下划线前缀）
// 3. Go: 方法接收者可以是值或指针；Dart: 方法隐式使用 this
// 4. Go: 没有继承，只有组合；Dart: 支持继承和组合
// 5. Go: JSON 需要 struct tags；Dart: 使用 toJson/fromJson 方法`}
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">接口实现对比</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3.5 leading-relaxed text-sm">
          Go 的隐式接口 vs Dart 的显式接口
        </p>
        <CodeBlock 
          language="dart"
          title="Go vs Dart: 接口实现"
          code={`// Go 版本 - 隐式接口
package main

// 定义接口（鸭子类型）
type Shape interface {
    Area() float64
    Perimeter() float64
}

// 结构体自动实现接口（无需显式声明）
type Rectangle struct {
    Width  float64
    Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
    return 2 * (r.Width + r.Height)
}

// 使用
func PrintShapeInfo(s Shape) {
    fmt.Printf("Area: %.2f\\n", s.Area())
    fmt.Printf("Perimeter: %.2f\\n", s.Perimeter())
}

// ====================

// Dart 版本 - 显式接口
abstract class Shape {
  double get area;
  double get perimeter;
}

class Rectangle implements Shape {
  final double width;
  final double height;
  
  Rectangle({required this.width, required this.height});
  
  @override
  double get area => width * height;
  
  @override
  double get perimeter => 2 * (width + height);
}

// 使用
void printShapeInfo(Shape s) {
  print('Area: ${s.area}');
  print('Perimeter: ${s.perimeter}');
}

// Dart 也支持 Mixin（类似 Go 的组合）
mixin Flyable {
  void fly() {
    print('Flying!');
  }
}

class Bird with Flyable {
  void chirp() {
    print('Chirp chirp!');
  }
}

// Go 没有Mixin，只能通过组合实现类似功能
type Bird struct {
    flyer Flyer
}

type Flyer interface {
    Fly()
}

func (b *Bird) Chirp() {
    fmt.Println("Chirp chirp!")
}

func (b *Bird) Fly() {
    b.flyer.Fly()
}`}
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">面向对象关键差异</h3>
        <ul className="list-none p-0">
          {[
            '<strong>接口实现</strong>：Go 隐式（鸭子类型），Dart 显式（implements）',
            '<strong>继承机制</strong>：Go 没有继承（只有组合），Dart 支持继承和 Mixin',
            '<strong>构造函数</strong>：Go 用 NewXxx 函数，Dart 有多种构造函数形式',
            '<strong>方法接收者</strong>：Go 需要显式声明（值/指针），Dart 隐式使用 this',
            '<strong>序列化</strong>：Go 用 struct tags，Dart 用 toJson/fromJson 方法',
          ].map((item, index) => (
            <li key={index} className="py-2 pl-5 relative text-gray-700 dark:text-gray-300 leading-relaxed text-sm before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function NullSafetySection() {
  return (
    <>
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">空安全对比</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3.5 leading-relaxed text-sm">
          Dart 2.12+ 引入了严格的空安全，与 Go 的 nil 处理有本质区别
        </p>
        <CodeBlock 
          language="dart"
          title="Go vs Dart: 空安全"
          code={`// Go 版本 - nil 可能导致 panic
package main

func main() {
    var name *string  // 指针默认为 nil
    fmt.Println(*name)  // panic: nil pointer dereference
    
    // 需要显式检查
    if name != nil {
        fmt.Println(*name)
    }
    
    // 切片的 nil 检查
    var items []string
    if items != nil {
        fmt.Println(len(items))
    }
    
    // map 的 nil 检查
    var m map[string]int
    if m != nil {
        m["key"] = 1
    }
}

// ====================

// Dart 版本 - 编译时空安全检查
void main() {
  // String? 表示可能为 null
  String? name;  // 默认为 null
  
  // 编译错误：不能直接访问可能为 null 的值
  // print(name.length);  // 错误！
  
  // 使用 ?. 空感知操作符
  print(name?.length);  // null
  
  // 使用 ?? 空合并操作符
  print(name ?? 'default');  // 'default'
  
  // 使用 ! 断言非空（运行时检查）
  if (name != null) {
    print(name.length);  // 安全
  }
  
  // late 延迟初始化
  late String config = loadConfig();
  
  // final 不可变
  final String immutable = 'value';
  // immutable = 'new';  // 错误！
  
  // List 和 Map 的空安全
  List<String>? items;  // 可能为 null
  items = [];  // 赋值非空
  
  Map<String, int>? m;  // 可能为 null
  m = {};  // 赋值非空
}

String loadConfig() {
  return 'config';
}

// 关键差异：
// 1. Go: nil 可能导致运行时 panic，需要手动检查
// 2. Dart: 空安全在编译时保证，不会出现空指针异常
// 3. Go: 所有引用类型都可以为 nil
// 4. Dart: 需要显式声明类型是否可空（Type?）
// 5. Dart: 提供丰富的空安全操作符（?., ??, !等）`}
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">空安全操作符</h3>
        <CodeBlock 
          language="dart"
          title="Dart 空安全操作符"
          code={`// Dart 空安全操作符示例

void main() {
  String? name;
  
  // ?. 空感知访问
  print(name?.length);  // null
  
  // ?? 空合并
  print(name ?? 'Anonymous');  // 'Anonymous'
  
  // ??= 空赋值
  name ??= 'John';
  print(name);  // 'John'
  
  // ! 非空断言（运行时检查）
  String definitelyName = name!;  // 如果 name 为 null，抛出异常
  
  // 级联空感知
  User? user = User(name: 'John');
  print(user?.name?.toUpperCase());  // 'JOHN'
  
  // 列表空安全
  List<String>? items;
  print(items?.length);  // null
  print(items?.first);   // null
  
  // 空安全链式调用
  print(user?.profile?.bio ?? 'No bio');
}

class User {
  final String? name;
  final Profile? profile;
  
  User({this.name, this.profile});
}

class Profile {
  final String? bio;
  Profile({this.bio});
}

// vs Go 的 nil 检查
func printName(name *string) {
    if name == nil {
        fmt.Println("Anonymous")
        return
    }
    fmt.Println(*name)
}`}
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">空安全最佳实践</h3>
        <ul className="list-none p-0">
          {[
            '<strong>优先使用非空类型</strong>：只有确实可能为 null 时才使用 Type?',
            '<strong>避免过度使用 !</strong>：非空断言应该只在确定不为 null 时使用',
            '<strong>使用 late 谨慎</strong>：确保延迟初始化的变量在使用前会被赋值',
            '<strong>合理使用 ?? 操作符</strong>：提供有意义的默认值',
            '<strong>类型设计</strong>：让 API 明确表达是否可能返回 null',
          ].map((item, index) => (
            <li key={index} className="py-2 pl-5 relative text-gray-700 dark:text-gray-300 leading-relaxed text-sm before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function FunctionalSection() {
  return (
    <>
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">函数式编程对比</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3.5 leading-relaxed text-sm">
          Dart 提供了丰富的函数式编程特性，与 Go 的函数处理方式有所不同
        </p>
        <CodeBlock 
          language="dart"
          title="Go vs Dart: 函数式编程"
          code={`// Go 版本
package main

import "fmt"

// 高阶函数
func mapInts(arr []int, fn func(int) int) []int {
    result := make([]int, len(arr))
    for i, v := range arr {
        result[i] = fn(v)
    }
    return result
}

func filterInts(arr []int, fn func(int) bool) []int {
    result := []int{}
    for _, v := range arr {
        if fn(v) {
            result = append(result, v)
        }
    }
    return result
}

func reduceInts(arr []int, initial int, fn func(int, int) int) int {
    result := initial
    for _, v := range arr {
        result = fn(result, v)
    }
    return result
}

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    
    // Map
    doubled := mapInts(numbers, func(n int) int {
        return n * 2
    })
    fmt.Println(doubled) // [2 4 6 8 10]
    
    // Filter
    evens := filterInts(numbers, func(n int) bool {
        return n%2 == 0
    })
    fmt.Println(evens) // [2 4]
    
    // Reduce
    sum := reduceInts(numbers, 0, func(acc, n int) int {
        return acc + n
    })
    fmt.Println(sum) // 15
}

// ====================

// Dart 版本
void main() {
  final numbers = [1, 2, 3, 4, 5];
  
  // Map - 箭头函数
  final doubled = numbers.map((n) => n * 2);
  print(doubled); // (2, 4, 6, 8, 10)
  
  // Filter
  final evens = numbers.where((n) => n % 2 == 0);
  print(evens); // (2, 4)
  
  // Reduce
  final sum = numbers.fold(0, (acc, n) => acc + n);
  print(sum); // 15
  
  // 链式操作
  final result = numbers
    .where((n) => n % 2 == 0)
    .map((n) => n * 2)
    .reduce((acc, n) => acc + n);
  print(result); // 12 (2*2 + 4*2)
}

// 高阶函数示例
List<T> mapList<T, R>(List<T> list, R Function(T) fn) {
  return list.map(fn).toList();
}

// 函数作为一等公民
void applyOperation(int value, int Function(int) operation) {
  print(operation(value));
}

void main() {
  final numbers = [1, 2, 3, 4, 5];
  final squared = mapList(numbers, (n) => n * n);
  print(squared); // [1, 4, 9, 16, 25]
  
  applyOperation(5, (n) => n * 2); // 10
  
  // 闭包
  final multiplier = (int factor) {
    return (int n) => n * factor;
  };
  
  final double = multiplier(2);
  print(double(5)); // 10
}

// 关键差异：
// 1. Dart 有内置的 map/where/fold 等方法，Go 需要手动实现
// 2. Dart 支持箭头函数语法，更简洁
// 3. Dart 支持链式调用，Go 需要多行代码
// 4. Dart 的集合操作返回惰性迭代器，Go 立即计算
// 5. Dart 支持更丰富的函数式操作符`}
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">函数式编程关键差异</h3>
        <ul className="list-none p-0">
          {[
            '<strong>内置方法</strong>：Dart 有 map/where/fold，Go 需要手动实现',
            '<strong>箭头函数</strong>：Dart 支持简洁的箭头语法，Go 只能用完整函数',
            '<strong>链式调用</strong>：Dart 支持流畅的链式操作，Go 需要多行代码',
            '<strong>惰性求值</strong>：Dart 的 map/where 返回惰性迭代器，Go 立即计算',
            '<strong>闭包支持</strong>：两者都支持，但 Dart 语法更简洁',
          ].map((item, index) => (
            <li key={index} className="py-2 pl-5 relative text-gray-700 dark:text-gray-300 leading-relaxed text-sm before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function PatternsSection() {
  return (
    <>
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">模式匹配对比</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3.5 leading-relaxed text-sm">
          Dart 3.0 引入了强大的模式匹配功能，与 Go 的 switch 语句相比更强大
        </p>
        <CodeBlock 
          language="dart"
          title="Go vs Dart: 模式匹配"
          code={`// Go 版本 - switch 语句
package main

import "fmt"

func describe(value interface{}) {
    switch v := value.(type) {
    case int:
        fmt.Printf("Integer: %d\\n", v)
    case string:
        fmt.Printf("String: %s\\n", v)
    case bool:
        fmt.Printf("Boolean: %t\\n", v)
    default:
        fmt.Printf("Unknown type: %T\\n", v)
    }
}

func main() {
    describe(42)
    describe("hello")
    describe(true)
    describe(3.14)
}

// Go 结构体解构（Go 1.18+）
type Point struct {
    X, Y int
}

func distance(p Point) int {
    switch {
    case p.X == 0 && p.Y == 0:
        return 0
    default:
        return p.X*p.X + p.Y*p.Y
    }
}

// ====================

// Dart 版本 - 模式匹配
String describe(Object? value) {
  return switch (value) {
    int i => 'Integer: $i',
    String s => 'String: $s',
    bool b => 'Boolean: $b',
    null => 'null value',
    _ => 'Unknown type: ${value.runtimeType}',
  };
}

void main() {
  print(describe(42));        // Integer: 42
  print(describe('hello'));   // String: hello
  print(describe(true));      // Boolean: true
  print(describe(3.14));      // Unknown type: double
  print(describe(null));      // null value
}

// 记录类型解构
void main() {
  final point = (x: 3, y: 4);
  
  final result = switch (point) {
    (x: 0, y: 0) => 'Origin',
    (x: var x, y: 0) => 'On X axis at $x',
    (x: 0, y: var y) => 'On Y axis at $y',
    (x: var x, y: var y) => 'At ($x, $y)',
  };
  
  print(result); // At (3, 4)
}

// 类解构
class Point {
  final int x;
  final int y;
  Point(this.x, this.y);
}

void main() {
  final point = Point(3, 4);
  
  switch (point) {
    case Point(x: 0, y: 0):
      print('Origin');
    case Point(x: var x, y: var y) when x == y:
      print('On diagonal at $x');
    case Point(x: var x, y: var y):
      print('At ($x, $y)');
  }
}

// 列表解构
void main() {
  final numbers = [1, 2, 3, 4, 5];
  
  final result = switch (numbers) {
    [] => 'Empty',
    [var first] => 'Single: $first',
    [var first, ...var rest] => 'First: $first, Rest: $rest',
  };
  
  print(result); // First: 1, Rest: [2, 3, 4, 5]
}

// 关键差异：
// 1. Dart 3.0+ 的 switch 是表达式，可以返回值
// 2. Dart 支持更丰富的模式匹配（记录、类、列表等）
// 3. Dart 支持 when 守卫条件
// 4. Dart 支持解构赋值
// 5. Go 的 switch 只能用于值匹配和类型断言`}
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">模式匹配进阶</h3>
        <CodeBlock 
          language="dart"
          title="Dart 模式匹配进阶"
          code={`// Dart 模式匹配进阶示例

// if-case 语句
void main() {
  final pair = (1, 2);
  
  if (pair case (var x, var y) when x > y) {
    print('First is greater: $x > $y');
  } else {
    print('Not greater');
  }
}

// 模式赋值
void main() {
  final json = {'name': 'John', 'age': 30};
  
  if (json case {'name': String name, 'age': int age}) {
    print('Name: $name, Age: $age');
  }
}

// for 循环中的模式
void main() {
  final points = [(1, 2), (3, 4), (5, 6)];
  
  for (final (x, y) in points) {
    print('Point: ($x, $y)');
  }
}

// 可选模式匹配
void main() {
  final result = getUser();
  
  switch (result) {
    case Success(value: var user):
      print('Success: $user');
    case Error(message: var error):
      print('Error: $error');
    case null:
      print('No result');
  }
}

// 模式匹配在函数参数中
void main() {
  handleData([1, 2, 3]);  // List
  handleData({'key': 'value'});  // Map
  handleData('string');  // String
}

void handleData(dynamic data) {
  switch (data) {
    case List(length: var len) when len > 0:
      print('List with $len items');
    case Map(length: var len) when len > 0:
      print('Map with $len entries');
    case String(length: var len) when len > 0:
      print('String with $len characters');
    default:
      print('Other type');
  }
}

// vs Go 的类型断言
func handleData(data interface{}) {
    switch v := data.(type) {
    case []interface{}:
        fmt.Printf("List with %d items\\n", len(v))
    case map[string]interface{}:
        fmt.Printf("Map with %d entries\\n", len(v))
    case string:
        fmt.Printf("String with %d characters\\n", len(v))
    default:
        fmt.Println("Other type")
    }
}`}
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">模式匹配最佳实践</h3>
        <ul className="list-none p-0">
          {[
            '<strong>使用 switch 表达式</strong>：比传统的 if-else 更清晰',
            '<strong>合理使用守卫条件</strong>：when 子句让模式匹配更精确',
            '<strong>利用解构</strong>：简化数据提取逻辑',
            '<strong>模式优先原则</strong>：将最具体的模式放在前面',
            '<strong>避免过度匹配</strong>：保持代码可读性',
          ].map((item, index) => (
            <li key={index} className="py-2 pl-5 relative text-gray-700 dark:text-gray-300 leading-relaxed text-sm before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function ComparisonSection() {
  return (
    <>
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">完整语言对比</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3.5 leading-relaxed text-sm">
          Go 和 Dart 在设计哲学和应用场景上有显著差异
        </p>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm border border-gray-200 dark:border-gray-700">
            <thead>
              <tr>
                <th className="px-3.5 py-2.5 text-left border-b border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-bold text-gray-900 dark:text-gray-100 sticky top-0">维度</th>
                <th className="px-3.5 py-2.5 text-left border-b border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-bold text-gray-900 dark:text-gray-100 sticky top-0">Go</th>
                <th className="px-3.5 py-2.5 text-left border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-bold text-gray-900 dark:text-gray-100 sticky top-0">Dart</th>
              </tr>
            </thead>
            <tbody>
              {[
                { dimension: '设计哲学', go: '简单、实用、性能优先', dart: '现代、类型安全、开发者体验' },
                { dimension: '主要用途', go: '后端服务、系统编程、云原生', dart: '前端（Flutter）、跨平台应用' },
                { dimension: '执行模型', go: '编译型、多线程', dart: 'JIT/AOT 双模式、单线程 Event Loop' },
                { dimension: '并发模型', go: 'Goroutine + Channel', dart: 'Future + Stream + Isolate' },
                { dimension: '类型系统', go: '结构体 + 组合 + 泛型', dart: '类 + 继承 + 泛型' },
                { dimension: '错误处理', go: 'error 返回值', dart: 'Exception + try/catch' },
                { dimension: '接口机制', go: '隐式鸭子类型', dart: '显式 implements' },
                { dimension: '空安全', go: '运行时 nil 检查', dart: '编译时空安全' },
                { dimension: '函数式编程', go: '有限支持', dart: '丰富支持（map/where/fold）' },
                { dimension: '学习曲线', go: '平缓，语法简单', dart: '中等，概念较多' },
                { dimension: '生态系统', go: '成熟，专注后端', dart: '强大，专注移动/Web' },
                { dimension: '性能', go: '极高，接近 C', dart: '良好，适合移动应用' },
              ].map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-3.5 py-2.5 border-b border-r border-gray-200 dark:border-gray-700 font-medium">{row.dimension}</td>
                  <td className="px-3.5 py-2.5 border-b border-r border-gray-200 dark:border-gray-700">{row.go}</td>
                  <td className="px-3.5 py-2.5 border-b border-gray-200 dark:border-gray-700">{row.dart}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">何时选择 Dart？</h3>
        <ul className="list-none p-0">
          {[
            '<strong>跨平台应用开发</strong>：使用 Flutter 构建 iOS/Android/Web 桌面应用',
            '<strong>前端项目</strong>：需要类型安全的 JavaScript 替代方案',
            '<strong>快速原型开发</strong>：热重载功能加速开发迭代',
            '<strong>团队熟悉面向对象</strong>：从 Java/C# 背景迁移',
            '<strong>现代开发体验</strong>：需要优秀的 IDE 支持和工具链',
          ].map((item, index) => (
            <li key={index} className="py-2 pl-5 relative text-gray-700 dark:text-gray-300 leading-relaxed text-sm before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">何时选择 Go？</h3>
        <ul className="list-none p-0">
          {[
            '<strong>后端服务</strong>：API 服务、微服务、分布式系统',
            '<strong>高并发场景</strong>：需要真正并行处理和强大并发控制',
            '<strong>系统编程</strong>：工具、CLI 应用、操作系统组件',
            '<strong>云原生应用</strong>：Docker、Kubernetes 生态',
            '<strong>简单可维护</strong>：需要代码简洁、易于理解的团队项目',
          ].map((item, index) => (
            <li key={index} className="py-2 pl-5 relative text-gray-700 dark:text-gray-300 leading-relaxed text-sm before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">总结</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3.5 leading-relaxed text-sm">
          Go 和 Dart 都是优秀的现代语言，但设计目标和适用场景不同：
        </p>
        <ul className="list-none p-0">
          {[
            '<strong>Go</strong>：适合构建高性能、可扩展的后端服务和系统工具',
            '<strong>Dart</strong>：适合构建跨平台的移动应用和 Web 前端',
            '<strong>两者可以互补</strong>：后端用 Go，前端用 Dart/Flutter',
            '<strong>学习价值</strong>：掌握两种语言可以拓宽技术视野',
          ].map((item, index) => (
            <li key={index} className="py-2 pl-5 relative text-gray-700 dark:text-gray-300 leading-relaxed text-sm before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
