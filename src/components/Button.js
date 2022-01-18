        import PropTypes from 'prop-types'



        const Button = (props) => {

            return <button className='btn' style={{backgroundColor: props.color, fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1.2px'}} onClick={props.onClick}>{props.text}</button>
        }

        Button.defautProps = {
            color: 'steelblue'
        }

        Button.propTypes = {
            text: PropTypes.string,
            color: PropTypes.string
        }

        export default Button
