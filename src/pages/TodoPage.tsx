import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import FilterBar from '@/components/FilterBar';
import StatsBar from '@/components/StatsBar';
import { CheckSquare } from 'lucide-react';

export default function TodoPage() {
  const todoState = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Hero Image */}
        <div className="w-full mb-8 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/image-1.png"
            alt="Hero"
            className="w-full object-cover max-h-64"
          />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-600 rounded-xl">
            <CheckSquare className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
            <p className="text-sm text-gray-500">Stay organized, stay productive</p>
          </div>
        </div>

        {/* Stats */}
        <StatsBar
          activeCount={todoState.activeCount}
          completedCount={todoState.completedCount}
          total={todoState.allTodos.length}
        />

        {/* Add Form */}
        <AddTodoForm onAdd={todoState.addTodo} categories={todoState.categories} />

        {/* Filters */}
        <FilterBar
          filter={todoState.filter}
          setFilter={todoState.setFilter}
          search={todoState.search}
          setSearch={todoState.setSearch}
          categoryFilter={todoState.categoryFilter}
          setCategoryFilter={todoState.setCategoryFilter}
          categories={todoState.categories}
          completedCount={todoState.completedCount}
          onClearCompleted={todoState.clearCompleted}
        />

        {/* List */}
        <TodoList
          todos={todoState.todos}
          onToggle={todoState.toggleTodo}
          onDelete={todoState.deleteTodo}
          onEdit={todoState.editTodo}
        />
      </div>
    </div>
  );
}
