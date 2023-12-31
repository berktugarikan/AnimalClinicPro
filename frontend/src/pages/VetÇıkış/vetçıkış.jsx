import React from 'react';

class VetÇıkış extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: '', confirmPassword: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogout() {
    if (this.state.password && this.state.confirmPassword && this.state.password === this.state.confirmPassword) {
      localStorage.removeItem('userData');
      this.props.history.push('/homepage');
    }
  }

  render() {
    const { password, confirmPassword } = this.state;

    return (
      <div>
        <h1 style={{ color:'#6c9286'}}>Logout</h1>
        <div className="mb-2">
          <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" name="password" onChange={this.handleChange} />
        </div>
        <div className="mb-2">
          <label  htmlFor="confirmPassword" className="form-label">Password Repeat: </label>
            <input type="password" name="confirmPassword" onChange={this.handleChange} />
        </div>
        <div className="text-center">
        <button className="btn btn-primary" type="button" disabled={!password|| !confirmPassword || !(password == confirmPassword)}onClick={this.handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
}

export default VetÇıkış;
