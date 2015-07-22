/*
$.ajax({
				url : 'v1/syllabus/courseId/30300.json',
				datatype : 'json',
				data : 'courseId=' + $('#input_course_id').val()
						+ '&courseTitle='
						+ encodeURIComponent($('#input_course_title').val())
						+ '&courseInstructor='
						+ encodeURIComponent(instructorSelected)
						+ '&courseCareerGroup='
						+ $('#input_course_career').val()
						+ '&courseLanguage='
						+ $('#input_course_lang').val(),
				success : function(text) {
					alert(text);
				},
				error : function(fail) {
					alert("fail");
				}
				
			});
*/