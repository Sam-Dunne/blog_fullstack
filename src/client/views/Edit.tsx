import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';




const Edit = (props: DetailsProps) => {
	const history = useHistory();
	
	const { id } = useParams<{ id: string }>();


	// controls state of blog comment input
	const [newBlog, setNewBlog] = useState('');
	const handleSetNewBlog = (e: React.ChangeEvent<HTMLInputElement>) => setNewBlog(e.target.value)

	useEffect(() => {
		fetch(`/api/blogs/${id}`)
			.then(res => res.json())
			.then(blog => {
				setNewBlog(blog.content);
			})
	}, [id])

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		
		// console.log({ resMessage: `deleted blog id: ${id}` })  //check against postman res
		fetch(`/api/blogs/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ resMessage: `deleted blog id: ${id}` })
		})
			.then(res => res.json())
			.then(serverRes => {
				console.log(serverRes);
				history.push('/');
			});
	};

	const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (newBlog.length === 0 || newBlog.length > 250 ) {
            Swal.fire({
                icon: 'error',
                title: 'Whoopsies...',
                text: 'Empty Required Field or Character MAX exceeded!',
				footer: 'Max Blog length 250 characters'
            })
            return;
        }
		console.log({
			content: newBlog
		});
		fetch(`/api/blogs/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ content: newBlog })
		})
			.then(res => res.json())
			.then(serverRes => {
				console.log(serverRes);
				history.push('/details/' + id);
			})
	}

	return (

		<section>

			<section>
				<form
					id="chirp-form"
					className="bg-info justify-content-center m-3 p-3">
					<div className="mb-3">
						<input
							type="text"
							className="form-control mb-2"
							id="blog-input"
							placeholder="What's good yo?!?"
							value={newBlog}
							onChange={handleSetNewBlog}
						/>
					</div>

					<div className="container ">
						<div className="row justify-content-around align-items-center">
							<button
								onClick={handleEdit}
								type="submit"
								className="btn btn-warning mb-2 mr-2">
								Submit Edit
                   		 	</button>
							<button
								onClick={handleDelete}
								type="submit"
								className="btn btn-danger mb-2 mr-2">
								Delete Blog
                    		</button>
						</div>
						<div className="row justify-content-center align-items-center">
							<Link to="/" className="bg-light rounded my-2 mx-auto p-2">
								Home
                    		</Link>
						</div>
					</div>
				</form>
			</section>

		</section>

	);
};

interface DetailsProps { }



export default Edit;