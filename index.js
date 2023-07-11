Vue.component('header-component', {
  template: `
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: rgb(214, 214, 215);">
      <a class="navbar-brand" href="#" style="font-size:25px; color: black;">Personal-FIN-Tracker</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" >
            <a class="nav-link" href="login.php">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Summary</a>
          </li>
        </ul>
      </div>
    </nav>
  `
});

Vue.component('modal-component', {
  template: `
    <div>
      <div class="container">
        <div class="big-box">
          <button class="big-box-button" @click="openModal">ENTER YOUR EXPENSES/SAVINGS</button>
        </div>
      </div>

      <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content custom-modal-content">
            <div class="modal-header">
              <h4 class="modal-title custom-modal-title">Personal-FIN-Tracker</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal">X</button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="name" class="custom-label">Name:</label>
                  <input type="text" class="form-control form-control-lg custom-input" id="name" v-model="name">
                </div>
                <div class="form-group">
                  <label for="amount" class="custom-label">Amount:</label>
                  <input type="number" class="form-control form-control-lg custom-input" id="amount" v-model="amount">
                </div>
                <div class="form-group">
                  <label for="date" class="custom-label">Date:</label>
                  <input type="date" class="form-control form-control-lg custom-input" id="date" v-model="date">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button v-if="!editMode" type="button" class="btn btn-danger" @click="saveExpense">Expenses</button>
              <button v-else type="button" class="btn btn-primary" @click="updateExpense">Update Expense</button>
              <button v-if="!editModeIncome" type="button" class="btn btn-success" @click="saveIncome">Income/Earnings</button>
              <button v-else type="button" class="btn btn-primary" @click="updateIncome">Update Income</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      name: '',
      amount: '',
      date: '',
      editMode: false,
      editModeIncome: false,
      editedExpenseId: null, // Track the edited expense ID
      editedIncomeId: null // Track the edited income ID
    };
  },
  methods: {
    openModal() {
      $('#myModal').modal('show');
      this.editMode = false;
      this.editModeIncome = false;
      this.editedExpenseId = null; // Reset edited expense ID
      this.editedIncomeId = null; // Reset edited income ID
    },
    closeModal() {
      $('#myModal').modal('hide');
      this.editMode = false;
      this.editModeIncome = false;
      this.editedExpenseId = null; // Reset edited expense ID
      this.editedIncomeId = null; // Reset edited income ID
    },
    saveExpense() {
      const expense = {
        id: Date.now(),
        name: this.name,
        amount: this.amount,
        date: this.date
      };
      this.$emit('expense-added', expense);
      this.clearForm();
      $('#myModal').modal('hide');
    },
    saveIncome() {
      const income = {
        id: Date.now(),
        name: this.name,
        amount: this.amount,
        date: this.date
      };
      this.$emit('income-added', income);
      this.clearForm();
      $('#myModal').modal('hide');
    },
    clearForm() {
      this.name = '';
      this.amount = '';
      this.date = '';
    },
    enterEditMode(expense) {
      this.editMode = true;
      this.editedExpenseId = expense.id;
      this.name = expense.name;
      this.amount = expense.amount;
      this.date = expense.date;
      $('#myModal').modal('show');
    },
    enterEditModeIncome(income) {
      this.editModeIncome = true;
      this.editedIncomeId = income.id;
      this.name = income.name;
      this.amount = income.amount;
      this.date = income.date;
      $('#myModal').modal('show');
    },
    updateExpense() {
      const expense = {
        id: this.editedExpenseId,
        name: this.name,
        amount: this.amount,
        date: this.date
      };
      this.$emit('expense-updated', expense);
      this.clearForm();
      $('#myModal').modal('hide');
    },
    updateIncome() {
      const income = {
        id: this.editedIncomeId,
        name: this.name,
        amount: this.amount,
        date: this.date
      };
      this.$emit('income-updated', income);
      this.clearForm();
      $('#myModal').modal('hide');
    }
  }
});

new Vue({
  el: '#app',
  data: {
    expenses: [],
    incomeEarnings: [],
    editExpenseId: null,
    editedAmount: ''
  },
  methods: {
    toggleDetails(item) {
      item.showDetails = !item.showDetails;
    },
    saveExpense(expense) {
      this.expenses.push(expense);
      this.saveData();
    },
    saveIncome(income) {
      this.incomeEarnings.push(income);
      this.saveData();
    },
    editExpense(expense) {
      this.$refs.modal.enterEditMode(expense); // Invoke enterEditMode method on the modal component
    },
    editIncome(income) {
      this.$refs.modal.enterEditModeIncome(income); // Invoke enterEditModeIncome method on the modal component
    },
    updateExpense(expense) {
      const index = this.expenses.findIndex(item => item.id === expense.id);
      if (index !== -1) {
        this.expenses[index] = expense;
        this.saveData();
      }
    },
    updateIncome(income) {
      const index = this.incomeEarnings.findIndex(item => item.id === income.id);
      if (index !== -1) {
        this.incomeEarnings[index] = income;
        
        // Update the edited income if it matches the edited income ID
        if (this.editedIncomeId === income.id) {
          this.name = income.name;
          this.amount = income.amount;
          this.date = income.date;
        }
        
        this.saveData();
      }
    },
    
    deleteExpense(expense) {
      const index = this.expenses.findIndex(item => item.id === expense.id);
      if (index !== -1) {
        this.expenses.splice(index, 1);
        this.saveData();
      }
    },
    deleteIncome(income) {
      const index = this.incomeEarnings.findIndex(item => item.id === income.id);
      if (index !== -1) {
        this.incomeEarnings.splice(index, 1);
        this.saveData();
      }
    },
    calculateSavings() {
      let totalIncome = this.incomeEarnings.reduce((total, income) => total + Number(income.amount), 0);
      let totalExpenses = this.expenses.reduce((total, expense) => total + Number(expense.amount), 0);
      return totalIncome - totalExpenses;
    },
    saveData() {
      localStorage.setItem('expenses', JSON.stringify(this.expenses));
      localStorage.setItem('incomeEarnings', JSON.stringify(this.incomeEarnings));
    },
    loadData() {
      const savedExpenses = localStorage.getItem('expenses');
      const savedIncomeEarnings = localStorage.getItem('incomeEarnings');
      if (savedExpenses) {
        this.expenses = JSON.parse(savedExpenses);
      }
      if (savedIncomeEarnings) {
        this.incomeEarnings = JSON.parse(savedIncomeEarnings);
        
        // Loop through the incomeEarnings and update the edited income data
        this.incomeEarnings.forEach((income) => {
          if (income.id === this.editedIncomeId) {
            this.name = income.name;
            this.amount = income.amount;
            this.date = income.date;
          }
        });
      }
    }
  },    
  created() {
    this.loadData();
  },
  mounted() {
    this.loadData();
  },
  watch: {
    expenses: {
      handler() {
        this.saveData();
      },
      deep: true
    },
    incomeEarnings: {
      handler() {
        this.saveData();
      },
      deep: true
    }
  }
});
